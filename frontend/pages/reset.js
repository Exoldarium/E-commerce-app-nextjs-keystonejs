import RequestPasswordReset from '../components/RequestPasswordReset';
import ResetPassword from '../components/ResetPassword';

export default function ResetPage({ query }) {
  if (query.token) {
    return <ResetPassword token={query.token} />;
  }
  return <RequestPasswordReset />;
}
