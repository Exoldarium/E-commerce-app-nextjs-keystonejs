import styled from 'styled-components';

export const NavStyles = styled.div`
  ${(props) => props.userMenu && `visibility: hidden;`};
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  /* flex: 1; */
  margin-top: 7rem;
  margin-right: 4rem;
  font-size: 1.3vw;
  border: 1px solid black;
  background: white;
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
  a {
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
  }
`;
