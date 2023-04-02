import styled from 'styled-components';

export const FormStyles = styled.form`
  padding-top: 35%;
  max-width: 50%;
  margin: 0 auto;
  height: 100vh;
  border: none;
  fieldset {
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    background: white;
    padding: 4rem 2rem 4rem 2rem;
    label {
      font-weight: bold;
    }
    input {
      border-radius: 3px;
      /* border: 1px solid black; */
      height: 2.5vh;
    }
    .uploadPhotoInput {
      width: 12.5vw;
    }
  }
  button {
    padding: 1rem;
    background: var(--peach);
    border-radius: 10px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    border: none;
    color: white;
    font-size: 15px;
    margin-top: 2rem;
    cursor: pointer;
  }
  a {
    font-weight: bold;
  }
  .productImage {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
  @media only screen and (max-width: 790px) {
    max-width: 80vw;
  }
`;

export const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

export const cardStyles = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#32325d',
      },
    },
    invalid: {
      fontFamily: 'Arial, sans-serif',
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};
