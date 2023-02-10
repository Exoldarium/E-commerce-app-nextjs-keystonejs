import styled from 'styled-components';

export const MobileNavStyles = styled.ul`
  display: none;
  @media only screen and (max-width: 790px) {
    ${(props) => props.active && `visibility: hidden`};
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
