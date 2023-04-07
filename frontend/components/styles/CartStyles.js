import styled from 'styled-components';

export const CartStyles = styled.div`
  padding-top: 25%;
  padding-bottom: 25%;
  min-height: 100vh;
  .totalPriceCart {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 2rem;
    font-size: 2rem;
    font-weight: bold;
  }
  @media only screen and (max-width: 790px) {
    padding-bottom: 0;
    .totalPriceCart {
      display: flex;
      font-size: 2rem;
      font-weight: bold;
      flex-direction: column;
      align-items: center;
    }
  }
`;

export const CartSliderStyles = styled.div`
  transform: translateX(100%);
  ${(props) => props.open && `transform: translateX(0)`};
  transition: 0.2s;
  position: fixed;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  right: 0;
  top: 0rem;
  height: 100%;
  width: 30vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 5px;
  padding: 10px;
  background: white;
  margin: 0 auto;
  z-index: 2;
  overflow-y: auto;
  .totalParagraph {
    font-weight: bold;
    font-size: 20px;
  }
  div {
    display: flex;
  }
  .cartLinks {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid black;
    font-weight: bold;
    width: 100%;
    .closeCartButton {
      margin-left: 10rem;
      align-self: flex-start;
      background: white;
      font-size: 2vw;
      border: none;
      cursor: pointer;
    }
    a:hover {
      color: var(--peach);
      text-decoration: none;
    }
    p {
      margin: 0 auto;
      text-align: center;
      font-size: 1.3vw;
      padding: 1rem;
    }
  }
  @media only screen and (max-width: 790px) {
    display: none;
  }
  .closeCartButton {
    align-self: flex-end;
    background: white;
    font-size: 2vw;
    border: none;
    cursor: pointer;
  }
  .removeFromCart {
    align-self: flex-start;
    background: white;
    border: none;
    padding-right: 0;
    font-size: 25px;
  }
`;

export const CartMenuPageStyles = styled.div`
  align-items: center;
  text-align: center;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 5px;
  margin: 0.5rem;
  width: 27vw;
  height: 12vh;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  input {
    height: 3vh;
    width: 5vw;
    text-align: center;
    font-size: 2rem;
  }
  .sliderStyles {
    flex-direction: column;
    align-items: center;
    border: none;
    flex: 1;
    p {
      border: none;
      margin: 0;
      .priceSpan {
        font-weight: bold;
      }
    }
    .buttonAmountDiv {
      display: flex;
      align-items: center;
      border: 1px solid black;
      border-radius: 3px;
      button {
        background: var(--peach);
        border: none;
        border-radius: 3px;
      }
      .quantityParagraph {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 3vh;
        width: 3vw;
        text-align: center;
        font-size: 2rem;
        margin: 0;
        border: none;
      }
    }
  }
  .imageInfo {
    flex: 1;
    flex-direction: row;
    align-items: center;
    img {
      border-radius: 10px;
      width: 50px;
      height: 50px;
      object-fit: cover;
    }
    h1 {
      cursor: pointer;
      font-size: 1.3vw;
      padding-left: 2rem;
    }
    h1:hover {
      color: var(--peach);
    }
  }
  button[aria-disabled='true'] {
    opacity: 0.6;
    pointer-events: none;
  }
  button {
    height: 3vh;
  }
  .removeFromCartMenu {
    height: 2vh;
  }
  .pdiv {
    border: none;
    height: 1px;
    .maxAmountP {
      color: red;
      font-size: 10px;
      text-align: center;
    }
  }
  @media only screen and (max-width: 790px) {
    display: none;
  }
`;

export const CartPageStyles = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  border-radius: 5px;
  margin: 1rem;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  background: white;
  height: 15vh;
  .cartPageInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    .priceParagraph {
      font-size: 2rem;
      margin: 0;
    }
  }
  h1 {
    flex: 1;
    padding-left: 2rem;
  }
  a:hover {
    color: var(--peach);
    cursor: pointer;
    text-decoration: none;
  }
  img {
    border-radius: 10px;
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
  .quantityDiv {
    display: flex;
    border: 1px solid black;
    border-radius: 3px;
    .quantityParagraph {
      height: 5vh;
      width: 5vw;
      text-align: center;
      font-size: 2rem;
      text-align: center;
      margin: 0;
    }
  }
  button[aria-disabled='true'] {
    opacity: 0.6;
    pointer-events: none;
  }
  button {
    height: 5vh;
    background: var(--peach);
    border: none;
    border-radius: 3px;
  }
  .removeFromCart {
    align-self: flex-start;
    background: white;
    border: none;
    padding-right: 0;
    height: fit-content;
    font-size: 25px;
    text-align: center;
  }
  .pdiv {
    padding-right: 1rem;
    .maxAmountP {
      color: red;
      font-size: 12px;
      font-weight: bold;
      margin: 0 auto;
    }
  }
  @media only screen and (max-width: 790px) {
    flex-direction: column;
    p {
      text-align: center;
      font-size: 2rem;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    button {
      height: 5vh;
    }
    .cartPageInfo {
      display: flex;
      flex-direction: column;
      align-items: center;
      .quantityParagraph {
        height: 5vh;
        width: 15vw;
        text-align: center;
        font-size: 2rem;
        text-align: center;
        margin: 0;
        border: 1px solid black;
      }
    }
    .removeFromCart {
      position: absolute;
      right: 2rem;
      height: 2rem;
      background: white;
      border: none;
      font-size: 5vw;
    }
    .totalPriceCart {
      text-align: center;
    }
  }
`;
