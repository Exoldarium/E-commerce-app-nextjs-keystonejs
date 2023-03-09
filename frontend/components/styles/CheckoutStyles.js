import styled from 'styled-components';

export const CheckoutItemStyles = styled.div`
  display: flex;
  flex-direction: row;
  width: 50vw;
  border-bottom: 1px solid black;
  padding-top: 0.5rem;
  h1 {
    font-size: 15px;
    padding-left: 5rem;
    flex: 1;
  }
  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
  p {
    text-align: right;
    flex: 1;
  }
  @media only screen and (max-width: 790px) {
    display: flex;
    flex-direction: row;
    width: 90vw;
    h1 {
      font-size: 15px;
      padding: 0;
      flex: 1;
    }
    p {
      text-align: right;
      flex: 1;
    }
  }
`;

export const CheckoutStyles = styled.div`
  padding-top: 25%;
  padding-bottom: 25%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50vw;
  margin: 0 auto;
  p {
    text-align: right;
  }
  @media only screen and (max-width: 790px) {
    width: 90vw;
  }
`;
