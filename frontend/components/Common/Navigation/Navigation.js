import Link from 'next/link';
import SignOut from '../../Auth/SignOut/SignOut';

import { useUser } from '../../User';
import { useCart } from '../../../lib/cartState';

import { NavStyles } from './Navigation.styles';
import { CartCount } from '../../UI/CartUI';

const Navigation = () => {
  const user = useUser();

  const { openCart } = useCart();
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">account</Link>
          <SignOut />
          <button type="button" onClick={openCart}>
            My Cart
            <CartCount
              count={user.cart.reduce(
                (tally, cartItem) =>
                  tally + (cartItem.product ? cartItem.quantity : 0),
                0
              )}
            />
          </button>
        </>
      )}
      {!user && <Link href="/signin">Sign In</Link>}
    </NavStyles>
  );
};

export default Navigation;
