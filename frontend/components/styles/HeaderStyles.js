import styled from 'styled-components';

export const HeaderStyles = styled.header`
  background: white;
  position: fixed;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: large;
  margin: 0 auto;
  width: 100vw;
  height: 12vh;
  padding-left: 50px;
  padding-right: 50px;
  border-bottom: 1px solid black;
  @media only screen and (max-width: 790px) {
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
