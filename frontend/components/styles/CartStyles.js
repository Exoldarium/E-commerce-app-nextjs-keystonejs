import styled from 'styled-components';

export const CartStyles = styled.div`
  padding-top: 25%;
  padding-bottom: 25%;
  min-height: 100vh;
  @media only screen and (max-width: 790px) {
    padding-bottom: 0;
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
    }
  }
  .imageInfo {
    flex: 1;
    flex-direction: row;
    cursor: pointer;
    img {
      width: 50px;
      height: 50px;
      object-fit: cover;
    }
    h1 {
      font-size: 1.3vw;
      flex: 1;
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
  }
  h1 {
    flex: 1;
    cursor: pointer;
    padding-left: 2rem;
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
    height: 30px;
    width: 70px;
  }
  @media only screen and (max-width: 790px) {
    flex-direction: column;
    p {
      height: 5vh;
      width: 15vw;
      text-align: center;
      font-size: 2rem;
    }
    button {
      height: 5vh;
    }
    .cartPageInfo {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;
