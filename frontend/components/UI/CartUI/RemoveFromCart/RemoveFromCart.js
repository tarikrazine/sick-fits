import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { BigButton } from './RemoveFromCart.styles';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(where: { id: $id }) {
      id
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

const RemoveFromCart = ({ id }) => {
  console.log('RemoveFromCart id: ', id);
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    update,
  });
  return (
    <BigButton
      onClick={removeFromCart}
      disabled={loading}
      type="button"
      title="Remove This Item from Cart"
    >
      &times;
    </BigButton>
  );
};

export default RemoveFromCart;
