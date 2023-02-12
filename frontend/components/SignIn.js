import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useForm from '../lib/useForm';
import { ParagraphStyles } from '../pages/signin';
import { ErrorMessageStyles } from './styles/ErrorMessageStyles';
import { FormStyles } from './styles/FormStyles';
import { USER_QUERY } from './User';

export const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

export default function SignIn() {
  const { inputs, handleInputs } = useForm({
    email: '',
    password: '',
  });
  const [signin, { data, loading, error }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: USER_QUERY }],
  });
  const signIn = data?.authenticateUserWithPassword;
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signin().catch(console.error);
  }

  if (loading) return <ParagraphStyles>Successfuly signed In!</ParagraphStyles>;

  if (signIn?.__typename === 'UserAuthenticationWithPasswordSuccess') {
    router.push('/products');
  }

  return (
    <FormStyles method="POST" onSubmit={handleSubmit}>
      {error && (
        <ErrorMessageStyles>{error && error.message}</ErrorMessageStyles>
      )}
      {signIn?.__typename === 'UserAuthenticationWithPasswordFailure' && (
        <ErrorMessageStyles>{signIn.message}</ErrorMessageStyles>
      )}
      <div>
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
      </div>
      <button type="submit">Sign in</button>
      <p>
        Don't have an account? <Link href="/signup">Sign up instead!</Link>
      </p>
    </FormStyles>
  );
}
