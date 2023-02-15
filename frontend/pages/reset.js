import RequestPasswordReset from '../components/RequestPasswordReset';
import ResetPassword from '../components/ResetPassword';

export default function ResetPage({ query }) {
  // only shows if the url query has the token
  if (query.token) {
    return <ResetPassword token={query.token} />;
  }
  return <RequestPasswordReset />;
}
