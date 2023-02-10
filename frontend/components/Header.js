import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import { HeaderStyles } from './styles/HeaderStyles';
import { LogoStyles } from './styles/LogoStyles';
import { MobileNavStyles } from './styles/MobileNavStyles';

export const OnClickActiveButtonStyles = styled.button`
  display: none;
  @media only screen and (max-width: 790px) {
    text-align: center;
    display: block;
  }
`;

export default function Header() {
  const [isActive, setIsActive] = useState(false);
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
      <MobileNavStyles active={isActive}>
        <Link href="/products">Products</Link>
        <Link href="/orders">Orders</Link>
        <Link href="/account">Account</Link>
        <Link href="/signin">Sign In</Link>
      </MobileNavStyles>
    </HeaderStyles>
  );
}
