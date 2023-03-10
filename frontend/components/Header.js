import Link from 'next/link';
import { calculateTotalAmount } from '../lib/calculateTotalAmount';
import { useSetState } from '../lib/stateProvider';
import Nav from './Nav';
import Search from './Search';
import { MobileNavButtonStyles } from './styles/ButtonStyles';
import { HeaderStyles } from './styles/HeaderStyles';
import { LogoStyles } from './styles/LogoStyles';
import { useUser } from './User';

export default function Header() {
  const user = useUser();
  const cartItems = user?.cart;
  const cartNotEmpty = cartItems?.length >= 1;
  const cartEmpty = cartItems?.length < 1;
  const { isMenuActive, toggleMenu, closeCart } = useSetState();

  if (!user) {
    return (
      <HeaderStyles>
        <LogoStyles onClick={closeCart}>
          <Link href="/products">It's a LOGO</Link>
        </LogoStyles>
        <Search />
        <Link href="/cart">Cart</Link>
        <Nav active={isMenuActive} onClick={toggleMenu} />
        {/* button visible only under 790px */}
        <MobileNavButtonStyles type="button" onClick={toggleMenu}>
          Click
        </MobileNavButtonStyles>
      </HeaderStyles>
    );
  }

  if (user) {
    return (
      <HeaderStyles>
        <LogoStyles onClick={closeCart}>
          <Link href="/products">It's a LOGO</Link>
        </LogoStyles>
        <Search />
        {cartNotEmpty && (
          <Link href="/cart">
            <a className="cartAmountLink">
              <span className="cartAmount">
                {calculateTotalAmount(cartItems)}
              </span>
              Cart
            </a>
          </Link>
        )}
        {cartEmpty && <Link href="/cart">Cart</Link>}
        <Nav active={isMenuActive} onClick={toggleMenu} />
        {/* button visible only under 790px */}
        <MobileNavButtonStyles type="button" onClick={toggleMenu}>
          Click
        </MobileNavButtonStyles>
      </HeaderStyles>
    );
  }
}
