import styled from 'styled-components';

export const FormStyles = styled.form`
  padding-top: 25%;
  max-width: 50%;
  margin: 0 auto;
  height: 100vh;
  fieldset {
    display: flex;
    flex-direction: column;
  }
  .productImage {
    width: 50px;
    height: 50px;
    object-fit: cover;
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
