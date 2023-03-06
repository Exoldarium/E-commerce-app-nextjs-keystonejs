import { useRouter } from 'next/router';
import Products from '../../components/Products';
import ProductsCount from '../../components/ProductsCount';

export default function ProductsPage() {
  const { query } = useRouter();
  const page = parseInt(query.page);
  return (
    <>
      <Products page={page || 1} />
      <ProductsCount page={page || 1} />
    </>
  );
}
