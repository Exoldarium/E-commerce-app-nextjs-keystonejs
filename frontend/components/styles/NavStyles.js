import styled from 'styled-components';

export const NavStyles = styled.div`
  display: flex;
  /* flex: 1; */
  font-size: 1.3vw;
  button {
    font-size: 1.3vw;
    background: none;
    border: none;
    font-weight: bold;
    cursor: pointer;
  }
  a {
    padding: 2rem;
    margin: 0 auto;
  }
  @media only screen and (max-width: 790px) {
    display: none;
    max-height: 6.5rem;
    padding: 5px;
    .mobileNavMenu.active {
      visibility: hidden;
    }
    .mobileNavMenu {
      visibility: show;
    }
  }
`;
