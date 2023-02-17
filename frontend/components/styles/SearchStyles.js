import styled from 'styled-components';

export const SearchStyles = styled.div`
  position: relative;
  flex: 1;
  text-align: left;
  padding: 2rem;
  input {
    width: 50rem;
    height: 4rem;
  }
  .listDiv {
    position: absolute;
    background: white;
    width: 100rem;
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
`;
