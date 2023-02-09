import styled from 'styled-components';

export const MobileNavStyles = styled.ul`
  display: none;
  @media only screen and (max-width: 790px) {
    position: fixed;
    top: 5rem;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 5px;
    padding: 10px;
    background: white;
    width: 15rem;
  }
`;
