import Header from '../Header';

import { GlobalStyles, InnerStyles } from './Layout.styles';

const Layout = ({ children }) => (
  <>
    <GlobalStyles />
    <Header />
    <InnerStyles>{children}</InnerStyles>
  </>
);

export default Layout;
