import { useRouter } from 'next/router';
import styled from 'styled-components';
import SignIn from '../components/SignIn';
import { useUser } from '../components/User';

export const ParagraphStyles = styled.p`
  position: absolute;
  top: 20rem;
  font-size: larger;
  font-weight: bolder;
`;

export default function SigninPage() {
  const user = useUser();
  if (!user) {
    return <SignIn />;
  }
  return <ParagraphStyles>You are already logged in!</ParagraphStyles>;
}
