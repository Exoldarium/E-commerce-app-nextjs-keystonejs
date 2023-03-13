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
  .createProductLink {
    width: fit-content;
  }
  div {
    display: flex;
    flex-direction: row;
    width: 50vw;
    border-bottom: 1px solid black;
    padding-top: 0.5rem;
    p {
      text-align: left;
      flex: 1;
    }
    img {
      width: 50px;
      height: 50px;
      object-fit: cover;
    }
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
