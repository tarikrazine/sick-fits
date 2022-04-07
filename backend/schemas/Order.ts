import { integer, text, relationship, virtual } from '@keystone-6/core/fields';
import { list, graphql } from '@keystone-6/core';
import formatMoney from '../lib/formatMoney';

export const Order = list({
  fields: {
    label: virtual({
      field: graphql.field({
        type: graphql.String,
        resolve(item) {
          return `${formatMoney(item.total)}`;
        },
      }) as any,
    }),
    total: integer(),
    items: relationship({ ref: 'OrderItem.order', many: true }),
    user: relationship({ ref: 'User.orders' }),
    charge: text(),
  },
});
