import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import { HeaderStyles } from './styles/HeaderStyles';
import { LogoStyles } from './styles/LogoStyles';
import { MobileNavStyles } from './styles/MobileNavStyles';

// Header should only have account and sign in options
// Create a dropdown that will have our user options
// Sign in should only be visible if the user is signed out
// Add a cart tab
// add search bar

export const OnClickActiveButtonStyles = styled.button`
  display: none;
  @media only screen and (max-width: 790px) {
    text-align: center;
    display: block;
  }
`;

export default function Header() {
  const [isActive, setIsActive] = useState(true);
  const onClick = () => setIsActive(!isActive);

  return (
    <HeaderStyles>
      <LogoStyles>
        <Link href="/products">It's a LOGO</Link>
      </LogoStyles>
      <Nav />
      {/* button visible only under 790px */}
      <OnClickActiveButtonStyles type="button" onClick={onClick}>
        Click
      </OnClickActiveButtonStyles>
      <div className={`mobileNavMenu ${isActive ? 'active' : 'hidden'}`}>
        <MobileNavStyles onClick={onClick} active={isActive}>
          <Link href="/products">Products</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <Link href="/signin">Sign In</Link>
        </MobileNavStyles>
      </div>
    </HeaderStyles>
  );
}
