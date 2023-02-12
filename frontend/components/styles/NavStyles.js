import styled from 'styled-components';

export const NavStyles = styled.div`
  display: flex;
  flex: 1;
  button {
    background: none;
    border: none;
    font-weight: bold;
    font-size: large;
    cursor: pointer;
  }
  a {
    margin: 0 auto;
  }
  @media only screen and (max-width: 790px) {
    display: none;
  }
`;
