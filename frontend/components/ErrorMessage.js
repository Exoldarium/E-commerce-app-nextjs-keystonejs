import { ErrorMessageStyles } from './styles/ErrorMessageStyles';

export default function ErrorMessage({ error }) {
  return <ErrorMessageStyles>There was an error! {error}</ErrorMessageStyles>;
}
