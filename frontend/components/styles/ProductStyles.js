import styled from 'styled-components';

export const ProductStyles = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.4);
  border-radius: 10px;
  background: white;
  div {
    display: flex;
    flex-direction: row;
    padding: 0.5rem;
    text-align: left;
    align-items: center;
    justify-items: center;
    .priceParagraph {
      font-size: 30px;
      flex: 1;
      padding-left: 2rem;
    }
  }
  img {
    cursor: pointer;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  p {
    margin: 0 15px;
  }
  .buttonDiv {
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-items: flex-start;
    button {
      padding: 1rem;
      background: var(--peach);
      border-radius: 10px;
      box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
      border: none;
      color: white;
      font-size: 15px;
      margin: 0 10px;
    }
  }
  @media only screen and (max-width: 790px) {
  }
`;
