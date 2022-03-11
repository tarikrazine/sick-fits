import 'dotenv/config';
import config from 'config';
import { config as configKeystone } from '@keystone-6/core';
import { statelessSessions } from '@keystone-6/core/session';
import { createAuth } from '@keystone-6/auth';

import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';

import { insertSeedData } from './seed-data';

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
  sessionData: `id name email`,
  passwordResetLink: {
    sendToken: async ({ itemId, identity, token, context }) => {
      console.log({ itemId, identity, token });
    },
    tokensValidForMins: 60,
  },
});

export default withAuth(
  configKeystone({
    server: {
      cors: {
        origin: [config.get<string>('frontendUrl')],
        credentials: true,
      },
    },
    db: {
      provider: 'sqlite',
      url: 'file:./keystone.db',
      async onConnect(context) {
        console.log('Connected to the database!');
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(context.prisma);
        }
      },
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists: {
      User,
      Product,
      ProductImage,
    },
    session: statelessSessions({
      maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
      secret: config.get<string>('cookieSecret'),
    }),
  })
);
