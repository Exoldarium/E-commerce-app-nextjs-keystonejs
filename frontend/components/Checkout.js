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
import { useSetState } from '../lib/stateProvider';
import { cardStyles, CheckoutFormStyles } from './styles/FormStyles';
import { USER_QUERY, useUser } from './User';

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
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      {checkoutMutationError && <p style={{ fontSize: 12 }}>{error.message}</p>}
      <CardElement options={cardStyles} />
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
