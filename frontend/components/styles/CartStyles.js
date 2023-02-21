import styled from 'styled-components';

export const CartStyles = styled.div`
  padding-top: 25%;
  padding-bottom: 25%;
  /* height: 100vh; */
`;

export const CartSliderStyles = styled.div`
  transform: translateX(100%);
  ${(props) => props.open && `transform: translateX(0)`};
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
  div {
    display: flex;
    flex-direction: row;
  }
  p {
    margin: 0 auto;
    border: 1px solid black;
    border-radius: 5px;
    /* width: 10vw;
    height: 5vh; */
    text-align: center;
    font-size: 1.3vw;
  }
`;

export const CartMenuPageStyles = styled.div`
  /* display: flex;
  flex-direction: row; */
  align-items: center;
  padding: 2rem;
  border: 1px solid black;
  border-radius: 5px;
  margin: 1rem;
  /* h1 {
    flex: 1;
  } */
  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
  input {
    height: 5vh;
    width: 5vw;
    text-align: center;
    font-size: 2rem;
  }
  button {
    height: 5vh;
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
  h1 {
    flex: 1;
  }
  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
  input {
    height: 5vh;
    width: 5vw;
    text-align: center;
    font-size: 2rem;
  }
  button {
    height: 5vh;
  }
  @media only screen and (max-width: 790px) {
    flex-direction: column;
    input {
      height: 5vh;
      width: 15vw;
      text-align: center;
      font-size: 2rem;
    }
    button {
      height: 5vh;
    }
  }
`;
