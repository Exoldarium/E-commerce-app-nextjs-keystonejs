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
    toggleSearchList,
  } = useSetState();

  if (!user) {
    return (
      <HeaderStyles>
        <LogoStyles onClick={closeCart}>
          <Link href="/products">It's a LOGO</Link>
        </LogoStyles>
        <MobileNavButtonStyles type="button" onClick={toggleSearchList}>
          Search
        </MobileNavButtonStyles>
        <Search />
        <Link href="/products">
          <a className="productsLink">Products</a>
        </Link>
        <Link href="/cart">Cart</Link>
        <Link href="/signin">
          <a className="signIn">Sign In</a>
        </Link>
        <Nav active={isMenuActive} userMenu={isUserMenuActive} />
        {/* button visible only under 790px */}
        <MobileNavButtonStyles type="button" onClick={toggleMenu}>
          Menu
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
        <MobileNavButtonStyles type="button" onClick={toggleSearchList}>
          Search
        </MobileNavButtonStyles>
        <Link href="/products">
          <a className="productsLink" onClick={closeCart}>
            Products
          </a>
        </Link>
        {cartNotEmpty && (
          <Link href="/cart">
            <a className="cartAmountLink">
              <span className="cartAmount">
                {calculateTotalAmount(cartItems)}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="cartIcon"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
            </a>
          </Link>
        )}
        {cartEmpty && (
          <Link href="/cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="cartIcon"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
          </Link>
        )}
        <div className="userMenu">
          <button type="button" onClick={toggleUserMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="userMenuIcon"
              viewBox="0 0 16 16"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
            </svg>
          </button>
        </div>
        <Nav active={isMenuActive} userMenu={isUserMenuActive} />
        {/* button visible only under 790px */}
        <MobileNavButtonStyles type="button" onClick={toggleMenu}>
          Menu
        </MobileNavButtonStyles>
      </HeaderStyles>
    );
  }
}
