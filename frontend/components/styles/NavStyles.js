import styled from 'styled-components';

export const NavStyles = styled.div`
  display: flex;
  flex: 1;
  a {
    margin: 0 auto;
  }
  @media only screen and (max-width: 790px) {
    display: none;
  }
`;
