import Link from 'next/link';
import SignOut from '../../Auth/SignOut/SignOut';

import { useUser } from '../../User';

import { NavStyles } from './Navigation.styles';

const Navigation = () => {
  const user = useUser();
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">account</Link>
          <SignOut />
        </>
      )}
      {!user && <Link href="/signin">Sign In</Link>}
    </NavStyles>
  );
};

export default Navigation;
