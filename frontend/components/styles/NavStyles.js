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
