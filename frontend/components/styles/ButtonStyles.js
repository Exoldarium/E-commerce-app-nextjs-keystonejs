import styled from 'styled-components';

export const MobileNavButtonStyles = styled.button`
  display: none;
  @media only screen and (max-width: 790px) {
    text-align: center;
    display: block;
  }
`;

export const CartButtonStyles = styled.button`
  cursor: pointer;
`;
