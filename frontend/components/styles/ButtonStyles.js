import styled from 'styled-components';

export const MobileNavButtonStyles = styled.button`
  display: none;
  @media only screen and (max-width: 790px) {
    text-align: center;
    display: block;
  }
`;

export const CartButtonStyles = styled.button`
  /* text-align: center;
  background: none;
  font-size: 1.3vw;
  font-weight: bold;
  display: block;
  border: none; */
  /* button[aria-disabled='true'] {
    pointer-events: none;
  } */
`;
