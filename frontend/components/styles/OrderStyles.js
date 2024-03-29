import styled from 'styled-components';

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
  @media only screen and (max-width: 790px) {
    width: 80vw;
    .orderItems {
      width: 80vw;
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
  .orderInfo {
    font-weight: bold;
    display: flex;
    p {
      flex: 1;
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
  .allOrders {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid black;
    .productOrders {
      display: flex;
      flex-direction: row;
      width: 50vw;
      padding-top: 0.5rem;
      p {
        text-align: right;
        flex: 1;
      }
      .chargeP {
        text-align: left;
        padding-left: 0.5rem;
      }
      button {
        background: var(--peach);
        border-radius: 3px;
        border: none;
        color: white;
        font-size: 15px;
        margin: 0 auto;
        cursor: pointer;
      }
    }
    .orderItems {
      visibility: hidden;
      height: 0;
      div {
        display: flex;
        flex-direction: row;
        margin-left: 7rem;
        margin-right: 5rem;
      }
      P {
        flex: 1;
      }
    }
    .orderItems.active {
      visibility: visible;
      height: fit-content;
    }
  }
  button {
    width: fit-content;
    align-self: center;
    margin: 1rem;
  }
  @media only screen and (max-width: 790px) {
    width: 80vw;
    .orderInfo {
      width: 80vw;
      display: flex;
      P {
        flex: 1;
        font-size: 3.5vw;
      }
      .date {
        text-align: right;
      }
    }
    .allOrders {
      display: flex;
      flex-direction: column;
      .productOrders {
        display: flex;
        width: 80vw;
        p {
          flex: 1;
          font-size: 3vw;
        }
        .chargeP {
          font-size: 2.5vw;
        }
      }
    }
    .orderItems {
      /* display: none; */
    }
  }
`;
