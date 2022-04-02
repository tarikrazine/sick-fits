import { list } from '@keystone-6/core';
import { integer, relationship } from '@keystone-6/core/fields';

export const CartItem = list({
  ui: {
    listView: { initialColumns: ['id', 'quantity', 'product', 'user'] },
  },
  fields: {
    quantity: integer({
      defaultValue: 1,
      validation: { isRequired: true },
    }),
    product: relationship({ ref: 'Product' }),
    user: relationship({ ref: 'User.cart' }),
  },
});
