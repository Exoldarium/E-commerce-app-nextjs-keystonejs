import Account from '../components/Account';
import { useUser } from '../components/User';

export default function AccountPage() {
  const user = useUser();
  if (user) {
    return <Account />;
  }
}
