import SignUp from '../components/SignUp';
import { useUser } from '../components/User';
import { ParagraphStyles } from './signin';

export default function SignupPage() {
  const user = useUser();
  if (!user) {
    return <SignUp />;
  }
  return <ParagraphStyles>You already have an account!</ParagraphStyles>;
}
