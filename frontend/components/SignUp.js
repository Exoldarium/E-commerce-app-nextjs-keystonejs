import Link from 'next/link';
import useForm from '../lib/useForm';
import { FormStyles } from './styles/FormStyles';

export default function SignUp() {
  const { inputs, handleInputs } = useForm({
    name: '',
    email: '',
    password: '',
  });

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
      <button type="submit">Register</button>
    </FormStyles>
  );
}
