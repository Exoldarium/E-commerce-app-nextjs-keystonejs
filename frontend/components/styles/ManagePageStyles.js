import styled from 'styled-components';

export const ManagePageStyles = styled.div`
  padding-top: 25%;
  /* padding-bottom: 25%; */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50vw;
  margin: 0 auto;
  .loadMoreButton {
    padding: 1rem;
    background: var(--peach);
    border-radius: 10px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    border: none;
    color: white;
    font-size: 15px;
    margin-top: 1rem;
    cursor: pointer;
  }
  .createProductLink {
    width: fit-content;
    font-weight: bold;
  }
  div {
    display: flex;
    flex-direction: row;
    width: 50vw;
    border-bottom: 1px solid black;
    p {
      text-align: left;
      flex: 1;
      padding-left: 0.5rem;
    }
    img {
      width: 50px;
      height: 50px;
      object-fit: cover;
    }
    a {
      align-self: center;
      padding-right: 1rem;
      font-weight: bold;
    }
  }
  button {
    width: fit-content;
    align-self: center;
    background: var(--peach);
    border-radius: 3px;
    border: none;
    color: white;
    font-size: 15px;
    cursor: pointer;
  }
  @media only screen and (max-width: 790px) {
    width: 100vw;
    margin: 0 auto;
    display: flex;
    align-items: center;
    div {
      width: 80vw;
    }
  }
`;
