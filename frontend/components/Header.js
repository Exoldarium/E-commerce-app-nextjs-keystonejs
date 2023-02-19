import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import Search from './Search';
import { HeaderStyles } from './styles/HeaderStyles';
import { LogoStyles } from './styles/LogoStyles';

export const OnClickActiveButtonStyles = styled.button`
  display: none;
  @media only screen and (max-width: 790px) {
    text-align: center;
    display: block;
  }
`;

export default function Header() {
  // close mobile menu on click
  const [isActive, setIsActive] = useState(true);
  const onClick = () => setIsActive(!isActive);

  return (
    <HeaderStyles>
      <LogoStyles>
        <Link href="/products">It's a LOGO</Link>
      </LogoStyles>
      <Search />
      <Nav active={isActive} onClick={onClick} />
      {/* button visible only under 790px */}
      <OnClickActiveButtonStyles type="button" onClick={onClick}>
        Click
      </OnClickActiveButtonStyles>
    </HeaderStyles>
  );
}
