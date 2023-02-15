import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import useForm from '../lib/useForm';
import { ParagraphStyles } from '../pages/signin';
import { ErrorMessageStyles } from './styles/ErrorMessageStyles';
import { FormStyles } from './styles/FormStyles';
import { USER_QUERY } from './User';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      name
      email
    }
  }
`;

export default function SignUp() {
  const { inputs, handleInputs, clearForm } = useForm({
    name: '',
    email: '',
    password: '',
  });
  const [singup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: USER_QUERY }],
  });

  async function handleSignUp(e) {
    e.preventDefault();
    const res = await singup().catch(console.error);
    clearForm();
  }

  return (
    <FormStyles method="POST" onSubmit={handleSignUp}>
      {error && (
        <ErrorMessageStyles>{error && error.message}</ErrorMessageStyles>
      )}
      {/* on sign up success */}
      {data?.createUser && (
        <p>
          Successfuly signed up with!
          <Link href="/signin"> Click here to sign in </Link>
        </p>
      )}
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="email@example.com"
          value={inputs.name}
          onChange={handleInputs}
          required
        />
        <label htmlFor="email">E-mail Address</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          value={inputs.email}
          onChange={handleInputs}
          required
        />
        <label htmlFor="password">Password</label>
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
      <button type="submit">Register</button>
      <p>
        Already have an account?
        <Link href="/signin"> Click here to sign in instead!</Link>
      </p>
      <p>
        Forgot your password?
        <Link href="/reset">Click here to reset your password!</Link>
      </p>
    </FormStyles>
  );
}
