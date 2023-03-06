import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import Link from 'next/link';
import { productsPerPage } from '../config';
import { ProductsCountStyles } from './styles/ProductsCountStyles';

export const PRODUCTS_COUNT_QUERY = gql`
  query PRODUCTS_COUNT_QUERY {
    productsCount
  }
`;

export default function ProductsCount({ page }) {
  const { data } = useQuery(PRODUCTS_COUNT_QUERY);
  const count = data?.productsCount;
  const pageCount = Math.ceil(count / productsPerPage);
  return (
    <ProductsCountStyles>
      <Head>
        <title>
          56 Sugar Gumpaste - Page {page} of {pageCount}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>Prev</a>
      </Link>
      <div>
        <p>
          Page {page} of {pageCount}
        </p>
        <p>{count} Items total</p>
      </div>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next</a>
      </Link>
    </ProductsCountStyles>
  );
}
