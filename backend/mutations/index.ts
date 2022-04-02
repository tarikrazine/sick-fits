import { graphQLSchemaExtension } from '@keystone-6/core';

import type { ExtendGraphqlSchema } from '@keystone-6/core/types';

import addToCart from './addToCart';

const graphql = String.raw;

export const extendGraphqlSchema: ExtendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      addToCart(productID: ID): CartItem
    }
  `,
  resolvers: {
    Mutation: {
      addToCart,
    },
  },
});
