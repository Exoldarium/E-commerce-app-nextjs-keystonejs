import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import styled from 'styled-components';
import useForm from '../lib/useForm';
import { ErrorMessageStyles } from './styles/ErrorMessageStyles';
import { FormStyles } from './styles/FormStyles';

const ResetErrorStyles = styled.p`
  position: absolute;
  top: 20rem;
`;

const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

export default function ResetPassword({ token }) {
  const { inputs, handleInputs, clearForm } = useForm({
    email: '',
    password: '',
    token,
  });
  const [reset, { data, loading, error }] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      variables: inputs,
    }
  );
  const redeemed = data?.redeemUserPasswordResetToken;
  const failure = data?.redeemUserPasswordResetToken?.__typename;

  async function handleReset(e) {
    e.preventDefault(e);
    const res = await reset().catch(console.error);
    clearForm();
  }

  // token redeemed successfully
  if (redeemed === null) {
    return (
      <ResetErrorStyles>
        Password reset success!
        <Link href="/signin">Click here to sign in!</Link>
      </ResetErrorStyles>
    );
  }

  return (
    <FormStyles onSubmit={handleReset}>
      {/* token redeem failed */}
      {failure && (
        <ErrorMessageStyles>
          Whoops! {redeemed.message}
          <Link href="/reset">Click here to reset your password again</Link> or
          contact us if you need any help!
        </ErrorMessageStyles>
      )}
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="email">E-mail Address</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="email@example.com"
          value={inputs.email}
          onChange={handleInputs}
          required
        />
        <label htmlFor="password">New Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={inputs.password}
          onChange={handleInputs}
          required
        />
      </fieldset>
      <button type="submit" disabled={loading}>
        Reset your password
      </button>
    </FormStyles>
  );
}
