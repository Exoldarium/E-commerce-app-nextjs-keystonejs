import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useForm from '../lib/useForm';
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
  const { inputs, handleInputs } = useForm({
    name: '',
    email: '',
    password: '',
  });
  const [singup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: USER_QUERY }],
  });
  const signIn = data?.authenticateUserWithPassword;
  const router = useRouter();

  async function handleSignUp(e) {
    e.preventDefault();
    const res = await singup();
  }

  if (signIn?.__typename === 'UserAuthenticationWithPasswordSuccess') {
    router.push('/products');
  }
  console.log(error);

  return (
    <FormStyles method="post">
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Email"
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
      </div>
      <button type="submit" onSubmit={handleSignUp}>
        Register
      </button>
    </FormStyles>
  );
}
