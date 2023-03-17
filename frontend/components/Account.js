import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import useForm from '../lib/useForm';
import { ErrorMessageStyles } from './styles/ErrorMessageStyles';
import { FormStyles } from './styles/FormStyles';
import { useUser } from './User';

const UPDATE_ACCOUNT_MUTATION = gql`
  mutation UPDATE_ACCOUNT_MUTATION($id: ID!, $name: String, $email: String) {
    updateUser(where: { id: $id }, data: { name: $name, email: $email }) {
      id
      name
      email
    }
  }
`;

export default function Account() {
  const user = useUser();
  console.log(user);
  const { inputs, handleInputs } = useForm(user);
  const [update, { data, loading, error }] = useMutation(
    UPDATE_ACCOUNT_MUTATION,
    {
      variables: {
        id: user.id,
        name: inputs.name,
        email: inputs.email,
      },
    }
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await update().catch((err) => console.error(err));
  }
  return (
    <FormStyles method="POST" onSubmit={handleSubmit}>
      {error && (
        <ErrorMessageStyles>{error && error.message}</ErrorMessageStyles>
      )}
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={inputs.name}
          onChange={handleInputs}
          required
        />
        <label htmlFor="email">E-mail Address</label>
        <input
          type="text"
          name="email"
          id="email"
          value={inputs.email}
          onChange={handleInputs}
          required
        />
        <Link href="/reset">Request password reset</Link>
      </fieldset>
      <button type="submit" disabled={loading}>
        Save
      </button>
    </FormStyles>
  );
}
