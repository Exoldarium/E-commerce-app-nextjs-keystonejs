import styled from 'styled-components';

export const SearchStyles = styled.div`
  flex: 1;
  text-align: left;
  padding: 2rem;
  .inputSearch {
    width: 25vw;
    height: 3vh;
    border-radius: 10px;
  }
  .listDiv.active {
    ${(props) => props.active && `height: 50vh`};
    display: flex;
    flex-direction: column;
    position: absolute;
    background: white;
    width: 50vw;
    border: 1px solid black;
    overflow-y: auto;
    a {
      margin: 0;
    }
    button {
      position: absolute;
      right: 0;
    }
  }
  .listDiv.hidden {
    display: none;
  }
  .singleList:hover {
    background: var(--lightGrey);
  }
  .singleList {
    cursor: pointer;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border-bottom: 1px solid black;
  }
  p {
    flex: 1;
    cursor: pointer;
  }
  img {
    width: 8vh;
    height: 8vh;
    object-fit: cover;
  }
  @media only screen and (max-width: 790px) {
    ${(props) => props.active && `position: absolute`};
    padding: 0;
    flex: 0;
    top: 0;
    bottom: 0;
    .inputSearch.active {
      width: 100vw;
      height: 8vh;
    }
    .inputSearch.hidden {
      display: none;
    }
    .listDiv.active {
      overflow-y: scroll;
      display: flex;
      flex-direction: column;
      width: 100vw;
      height: 100vh;
    }
  }
`;
