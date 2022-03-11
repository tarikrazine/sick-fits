import Link from 'next/link';

import Navigation from '../Navigation';

import { Logo, HeaderStyled } from './Header.styles';

const Header = () => (
  <HeaderStyled>
    <div className="bar">
      <Logo>
        <Link href="/">Sick fits</Link>
      </Logo>
      <Navigation />
    </div>
    <div className="sub-bar">Search</div>
  </HeaderStyled>
);

export default Header;
