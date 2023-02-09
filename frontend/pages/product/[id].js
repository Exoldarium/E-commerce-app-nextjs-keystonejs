import OneProduct from '../../components/OneProduct';

export default function OneProductPage({ query }) {
  return <OneProduct id={query.id} />;
}
