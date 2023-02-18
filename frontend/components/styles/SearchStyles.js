import styled from 'styled-components';

export const SearchStyles = styled.div`
  position: relative;
  flex: 1;
  text-align: left;
  padding: 2rem;
  input {
    width: 25vw;
    height: 3vh;
  }
  .listDiv {
    position: absolute;
    background: white;
    width: 60vw;
    .singleList {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      border: 1px solid black;
      p {
        flex: 1;
      }
    }
  }
  @media only screen and (max-width: 790px) {
    /* position: absolute;
    input {
      width: 100vw;
      height: 6.5rem;
    } */
    .listDiv {
      position: absolute;
      /* right: 0;
      left: 10; */
      height: fit-content;
      max-height: 100vh;
      width: 100vw;
    }
  }
`;
