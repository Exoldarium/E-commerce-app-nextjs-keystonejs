import UpdateProductPhoto from '../components/UpdateProductPhoto';

export default function UpdatePage({ query }) {
  return <UpdateProductPhoto id={query.id} />;
}
