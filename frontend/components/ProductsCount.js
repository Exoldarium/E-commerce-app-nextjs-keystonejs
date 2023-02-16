import { gql, useQuery } from '@apollo/client';

export const PRODUCTS_COUNT_QUERY = gql`
  query PRODUCTS_COUNT_QUERY {
    productsCount
  }
`;

export default function useProductsCount() {
  const { data } = useQuery(PRODUCTS_COUNT_QUERY);
  return data?.productsCount;
}
