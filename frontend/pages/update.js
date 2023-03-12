import UpdateProduct from '../components/UpdateProduct';

export default function UpdatePage({ query }) {
  console.log(query.id);
  return <UpdateProduct id={query.id} />;
}
