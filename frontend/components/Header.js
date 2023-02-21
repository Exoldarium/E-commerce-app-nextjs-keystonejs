import Link from 'next/link';
import { useSetState } from '../lib/stateProvider';
import CartMenu from './CartMenu';
import Nav from './Nav';
import Search from './Search';
import { MobileNavButtonStyles } from './styles/ButtonStyles';
import { HeaderStyles } from './styles/HeaderStyles';
import { LogoStyles } from './styles/LogoStyles';

export default function Header() {
  const { isMenuActive, toggleMenu } = useSetState();

  return (
    <HeaderStyles>
      <LogoStyles>
        <Link href="/products">It's a LOGO</Link>
      </LogoStyles>
      <Search />
      <Link href="/cart">Cart</Link>
      <CartMenu />
      <Nav active={isMenuActive} onClick={toggleMenu} />
      {/* button visible only under 790px */}
      <MobileNavButtonStyles type="button" onClick={toggleMenu}>
        Click
      </MobileNavButtonStyles>
    </HeaderStyles>
  );
}
