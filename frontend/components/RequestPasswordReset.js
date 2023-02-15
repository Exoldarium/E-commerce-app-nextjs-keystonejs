import { gql, useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import { FormStyles } from './styles/FormStyles';

export const REQUEST_PASSWORD_RESET_MUTATION = gql`
  mutation REQUEST_PASSWORD_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email)
  }
`;

export default function RequestPasswordReset() {
  const { inputs, handleInputs, clearForm } = useForm({
    email: '',
  });
  const [requestReset, { data, loading, error }] = useMutation(
    REQUEST_PASSWORD_RESET_MUTATION,
    {
      variables: inputs,
    }
  );

  async function handleReset(e) {
    e.preventDefault(e);
    const res = await requestReset().catch(console.error);
    clearForm();
  }

  return (
    <FormStyles onSubmit={handleReset}>
      {/* shows on succesful reset */}
      {data?.sendUserPasswordResetLink && (
        <p>Check your e-mail for a password reset link!</p>
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
      </fieldset>
      <button type="submit" disabled={loading}>
        Request password reset!
      </button>
    </FormStyles>
  );
}
