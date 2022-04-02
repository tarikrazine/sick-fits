import 'dotenv/config';
import config from 'config';
import { config as configKeystone } from '@keystone-6/core';
import { statelessSessions } from '@keystone-6/core/session';
import { createAuth } from '@keystone-6/auth';

import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { CartItem } from './schemas/CartItem';
import { extendGraphqlSchema } from './mutations';

import { insertSeedData } from './seed-data';
import { sendPasswordResetEmail } from './lib/mail';

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
      await sendPasswordResetEmail(token, identity);
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
      CartItem,
    },
    extendGraphqlSchema,
    session: statelessSessions({
      maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
      secret: config.get<string>('cookieSecret'),
    }),
  })
);
