import Link from 'next/link';
import { useSetState } from '../lib/stateProvider';
import Cart from './Cart';
import Nav from './Nav';
import Search from './Search';
import { CartButtonStyles, MobileNavButtonStyles } from './styles/ButtonStyles';
import { HeaderStyles } from './styles/HeaderStyles';
import { LogoStyles } from './styles/LogoStyles';

export default function Header() {
  // close mobile menu on click
  const { isMenuActive, toggleMenu } = useSetState();

  return (
    <HeaderStyles>
      <LogoStyles>
        <Link href="/products">It's a LOGO</Link>
      </LogoStyles>
      <Search />
      <CartButtonStyles type="button">Cart</CartButtonStyles>
      <Nav active={isMenuActive} onClick={toggleMenu} />
      <Cart />
      {/* button visible only under 790px */}
      <MobileNavButtonStyles type="button" onClick={toggleMenu}>
        Click
      </MobileNavButtonStyles>
    </HeaderStyles>
  );
}
