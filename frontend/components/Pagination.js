import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import Link from 'next/link';
import { productsPerPage } from '../config';
import { PaginationStyles } from './styles/PaginationStyles';

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    productsCount
  }
`;

export default function Pagination({ page }) {
  const { data, loading, error } = useQuery(PAGINATION_QUERY);
  const count = data?.productsCount;
  const pageCount = Math.ceil(count / productsPerPage);

  console.log(pageCount);

  return (
    <PaginationStyles>
      <Head>
        <title>
          56 Sugar Gumpaste | {page} of {pageCount}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`}>Previous</Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <Link href={`/products/${page + 1}`}>Next</Link>
      <p>{count} items total</p>
    </PaginationStyles>
  );
}
