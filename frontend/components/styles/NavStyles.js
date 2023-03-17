import styled from 'styled-components';

export const NavStyles = styled.div`
  ${(props) => props.userMenu && `visibility: hidden;`};
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  margin-top: 7rem;
  margin-right: 4rem;
  font-size: 1.3vw;
  border: 1px solid black;
  background: white;
  max-width: 12vw;
  div {
    display: flex;
    flex-direction: column;
  }
  h1 {
    font-size: 1.3vw;
    border-bottom: 1px solid black;
    padding-left: 2rem;
    padding-right: 2rem;
    margin: 0;
  }
  button {
    font-size: 1.3vw;
    background: none;
    border: none;
    font-weight: bold;
    cursor: pointer;
    padding: 2rem;
    text-align: left;
  }
  button:hover {
    text-decoration: underline;
  }
  a,
  button {
    padding: 2rem;
    margin: 0;
  }
  @media only screen and (max-width: 790px) {
    display: none;
    max-height: 6.5rem;
    padding: 5px;
  }
`;

export const MobileNavStyles = styled.ul`
  display: none;
  @media only screen and (max-width: 790px) {
    transform: translateX(-100%);
    ${(props) => props.active && `transform: translateX(0)`};
    transition: 0.2s;
    position: fixed;
    left: 0;
    top: 0rem;
    height: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 5px;
    padding: 10px;
    background: white;
    width: 80%;
    margin: 0 auto;
    h1 {
      font-size: 5vw;
      width: 100%;
      padding-left: 10px;
      border-bottom: 1px solid black;
      margin: 0;
    }
    div {
      display: flex;
      flex-direction: column;
    }
  }
`;
