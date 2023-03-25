import styled from 'styled-components';

export const CartStyles = styled.div`
  padding-top: 25%;
  padding-bottom: 25%;
  min-height: 100vh;
  .totalPriceCart {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-right: 2rem;
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
  right: 0;
  top: 0rem;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  background: white;
  width: 30%;
  margin: 0 auto;
  z-index: 2;
  div {
    display: flex;
    flex-direction: row;
  }
  p {
    margin: 0 auto;
    border: 1px solid black;
    border-radius: 5px;
    text-align: center;
    font-size: 1.3vw;
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
    font-size: 2vw;
    text-align: top;
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
  input {
    height: 3vh;
    width: 5vw;
    text-align: center;
    font-size: 2rem;
  }
  .sliderStyles {
    flex-direction: column;
    align-items: center;
    p {
      border: none;
    }
    div {
      display: flex;
      align-items: center;
      .quantityParagraph {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 3vh;
        width: 3vw;
        text-align: center;
        font-size: 2rem;
        margin: 0;
        border: 1px solid black;
      }
    }
  }
  .imageInfo {
    flex: 1;
    flex-direction: row;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      object-fit: cover;
    }
    h1 {
      cursor: pointer;
      font-size: 1.3vw;
      flex: 1;
    }
    h1:hover {
      color: violet;
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
  .maxAmountP {
    color: red;
    font-size: 10px;
  }
  .pdiv {
    height: 1px;
  }
  @media only screen and (max-width: 790px) {
    display: none;
  }
`;

export const CartPageStyles = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2rem;
  border: 1px solid black;
  border-radius: 5px;
  margin: 1rem;
  .cartPageInfo {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    p {
      font-size: 2rem;
    }
  }
  h1 {
    flex: 1;
    padding-left: 2rem;
  }
  a:hover {
    color: violet;
    cursor: pointer;
    text-decoration: none;
  }
  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
  .quantityParagraph {
    height: 5vh;
    width: 5vw;
    text-align: center;
    font-size: 2rem;
    text-align: center;
    margin: 0;
    border: 1px solid black;
  }
  .quantityDiv {
    display: flex;
  }
  button[aria-disabled='true'] {
    opacity: 0.6;
    pointer-events: none;
  }
  button {
    height: 5vh;
  }
  .removeFromCart {
    align-self: flex-start;
    background: white;
    border: none;
    padding-right: 0;
    font-size: 2.5vw;
    text-align: top;
  }
  .maxAmountP {
    color: red;
    font-size: 10px;
    margin: 0 auto;
  }
  .pdiv {
    height: 60px;
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
