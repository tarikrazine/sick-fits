import { useUser } from '../../../User';

import { CartStyles, Supreme, CloseButton } from './Cart.styles';

import formatMoney from '../../../../lib/formatMoney';
import calcTotalPrice from '../../../../lib/calcTotalPrice';
import CartItem from '../CartItem';
import { useCart } from '../../../../lib/cartState';

const Cart = () => {
  const me = useUser();

  const { cartOpen, closeCart } = useCart();

  if (!me) return null;

  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{me.name}'s Cart</Supreme>
        <CloseButton onClick={closeCart}>&times;</CloseButton>
      </header>
      <ul>
        {me.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
      </footer>
    </CartStyles>
  );
};

export default Cart;
