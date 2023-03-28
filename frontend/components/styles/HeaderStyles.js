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
  border: none;
  z-index: 2;
  .cartIcon {
    height: 3vh;
    width: auto;
    cursor: pointer;
  }
  a {
    margin-right: 2rem;
  }
  .userMenu {
    button {
      border: none;
      background: white;
      cursor: pointer;
      margin: 1rem 0 0 0;
    }
    .userMenuIcon {
      height: 3vh;
      width: auto;
    }
  }
  .cartAmount {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 3rem;
    text-align: center;
    border-radius: 20px;
    background: violet;
    width: 20px;
    height: 20px;
    font-size: 15px;
    color: black;
    margin: 0 auto;
  }
  @media only screen and (max-width: 790px) {
    max-height: 6.5rem;
    padding: 5px;
    .mobileNavMenu.active {
      visibility: hidden;
    }
    .mobileNavMenu {
      visibility: show;
    }
    .cartAmount {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 1.5rem;
      text-align: center;
      border-radius: 20px;
      background: violet;
      width: 20px;
      height: 20px;
      font-size: 15px;
      color: black;
      margin: 0 auto;
    }
    .userMenu,
    .productsLink,
    .signIn {
      display: none;
    }
  }
`;
