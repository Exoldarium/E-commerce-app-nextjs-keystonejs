import { gql, useMutation } from '@apollo/client';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import nProgress from 'nprogress';
import { useState } from 'react';
import styled from 'styled-components';
import { useSetState } from '../lib/stateProvider';
import { USER_QUERY, useUser } from './User';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const cardStyle = {
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

const CHECKOUT_MUTATION = gql`
  mutation CHECKOUT_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
        quantity
        price
      }
    }
  }
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { closeCart } = useSetState();
  const [
    checkout,
    { error: checkoutMutationError, loading: checkoutMutationLoading },
  ] = useMutation(CHECKOUT_MUTATION, {
    refetchQueries: [{ query: USER_QUERY }],
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    nProgress.start();
    // create a stripe payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    console.log(paymentMethod, error);
    // stop function if there's an error
    if (error) {
      setError(error);
      nProgress.done();
      // eslint-disable-next-line no-useless-return
      return;
    }

    // create an order
    const order = await checkout({
      variables: {
        token: paymentMethod.id,
      },
    });
    console.log(order);
    // send user to the order page after succesfull checkout
    router.push({
      pathname: '/order/[id]',
      query: { id: order.data.checkout.id },
    });
    closeCart();
    setLoading(false);
    nProgress.done();
  }

  return (
    // TODO add a loading indicator when user checks out
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      {checkoutMutationError && <p style={{ fontSize: 12 }}>{error.message}</p>}
      <CardElement options={cardStyle} />
      <button type="submit">Checkout</button>
    </CheckoutFormStyles>
  );
}

export default function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}
