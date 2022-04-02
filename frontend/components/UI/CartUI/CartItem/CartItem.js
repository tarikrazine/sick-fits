import formatMoney from '../../../../lib/formatMoney';
import RemoveFromCart from '../RemoveFromCart';

import { CartItemStyles } from './CartItem.styles';

const CartItem = ({ cartItem }) => {
  const { product } = cartItem;
  if (!product) return null;

  return (
    <CartItemStyles>
      <img
        width="100"
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
      />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * cartItem.quantity)}-
          <em>
            {cartItem.quantity} &times; {formatMoney(product.price)} each
          </em>
        </p>
      </div>
      <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
  );
};

export default CartItem;
