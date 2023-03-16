import Link from 'next/link';
import { calculateTotalAmount } from '../lib/calculateTotalAmount';
import { useSetState } from '../lib/stateProvider';
import Nav from './Nav';
import Search from './Search';
import { MobileNavButtonStyles } from './styles/ButtonStyles';
import { HeaderStyles } from './styles/HeaderStyles';
import { LogoStyles } from './styles/LogoStyles';
import { useUser } from './User';

// TODO
// add close on outside click
// add account page where user can update account info

export default function Header() {
  const user = useUser();
  const cartItems = user?.cart;
  const cartNotEmpty = cartItems?.length >= 1;
  const cartEmpty = cartItems?.length < 1;
  const {
    isMenuActive,
    toggleMenu,
    closeCart,
    isUserMenuActive,
    toggleUserMenu,
  } = useSetState();

  if (!user) {
    return (
      <HeaderStyles>
        <LogoStyles onClick={closeCart}>
          <Link href="/products">It's a LOGO</Link>
        </LogoStyles>
        <Search />
        <Link href="/products">
          <a className="productsLink">Products</a>
        </Link>
        <Link href="/cart">Cart</Link>
        <Link href="/signin">
          <a className="signIn">Sign In</a>
        </Link>
        <Nav
          active={isMenuActive}
          onClick={toggleMenu}
          userMenu={isUserMenuActive}
        />
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
        <Link href="/products">
          <a className="productsLink">Products</a>
        </Link>
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
        <div>
          <button type="button" className="userMenu" onClick={toggleUserMenu}>
            User Menu
          </button>
          <span>V</span>
        </div>
        <Nav
          active={isMenuActive}
          userMenu={isUserMenuActive}
          onClick={toggleMenu}
        />
        {/* button visible only under 790px */}
        <MobileNavButtonStyles type="button" onClick={toggleMenu}>
          Click
        </MobileNavButtonStyles>
      </HeaderStyles>
    );
  }
}
