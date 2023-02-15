import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import Nav, { SIGNOUT_MUTATION } from './Nav';
import { HeaderStyles } from './styles/HeaderStyles';
import { LogoStyles } from './styles/LogoStyles';
import { MobileNavStyles } from './styles/MobileNavStyles';
import { USER_QUERY, useUser } from './User';

export const OnClickActiveButtonStyles = styled.button`
  display: none;
  @media only screen and (max-width: 790px) {
    text-align: center;
    display: block;
  }
`;

export default function Header() {
  const [signout, { data }] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: USER_QUERY }],
  });
  const user = useUser();
  // close mobile menu on click
  const [isActive, setIsActive] = useState(true);
  const onClick = () => setIsActive(!isActive);

  return (
    <HeaderStyles>
      <LogoStyles>
        <Link href="/products">It's a LOGO</Link>
      </LogoStyles>
      <Nav active={isActive} onClick={onClick} />
      {/* button visible only under 790px */}
      <OnClickActiveButtonStyles type="button" onClick={onClick}>
        Click
      </OnClickActiveButtonStyles>
    </HeaderStyles>
  );
}
