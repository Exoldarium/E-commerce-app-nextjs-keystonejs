import styled from 'styled-components';

export const SearchStyles = styled.div`
  flex: 1;
  text-align: left;
  padding: 2rem;
  .inputSearch {
    width: 25vw;
    height: 3vh;
  }
  .listDiv.active {
    display: flex;
    flex-direction: column;
    position: absolute;
    background: white;
    width: 60vw;
    height: fit-content;
  }
  .listDiv.hidden {
    display: none;
  }
  .singleList:hover {
    background: grey;
  }
  .singleList {
    cursor: pointer;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border: 1px solid black;
  }
  p {
    flex: 1;
  }
  img {
    width: 8vh;
    height: 8vh;
    object-fit: cover;
  }
  @media only screen and (max-width: 790px) {
    ${(props) => props.active && `position: absolute`};
    .inputSearch.active {
      width: 100vw;
      height: 8vh;
    }
    .listDiv.active {
      display: flex;
      flex-direction: column;
      width: 100vw;
      height: fit-content;
    }
  }
`;