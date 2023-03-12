import styled from 'styled-components';

// TODO
// add styling for mobile

export const OrderStyles = styled.div`
  padding-top: 25%;
  padding-bottom: 25%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50vw;
  margin: 0 auto;
  .total {
    text-align: right;
    font-weight: bold;
  }
  h1 {
    font-size: 20px;
  }
  h2 {
    font-size: 17px;
  }
  .orderItems {
    display: flex;
    flex-direction: row;
    width: 50vw;
    border-bottom: 1px solid black;
    padding-top: 0.5rem;
    img {
      width: 50px;
      height: 50px;
      object-fit: cover;
    }
    h1 {
      font-size: 15px;
      padding-left: 5rem;
      flex: 1;
    }
    .name {
      text-align: left;
      padding-left: 1rem;
    }
    p {
      text-align: right;
      flex: 1;
    }
  }
`;

export const OrderHistoryStyles = styled.div`
  padding-top: 25%;
  padding-bottom: 25%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50vw;
  margin: 0 auto;
  .orderInfo {
    font-weight: bold;
    p {
      text-align: left;
    }
    .ref {
      text-align: left;
    }
    .date {
      text-align: center;
    }
    .total {
      text-align: right;
    }
  }
  div {
    display: flex;
    flex-direction: row;
    width: 50vw;
    border-bottom: 1px solid black;
    padding-top: 0.5rem;
    p {
      text-align: right;
      flex: 1;
    }
  }
  @media only screen and (max-width: 790px) {
    width: 100vw;
    div {
      display: flex;
      padding: 1rem;
      width: 100vw;
    }
  }
`;
