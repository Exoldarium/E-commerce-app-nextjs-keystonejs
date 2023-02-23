import { gql, useQuery } from '@apollo/client';

export const USER_QUERY = gql`
  query USER_QUERY {
    authenticatedItem {
      ... on User {
        id
        name
        email
        cart {
          id
          quantity
          product {
            id
            name
            price
            photo {
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`;

export function useUser() {
  // return users info
  const { data } = useQuery(USER_QUERY);
  return data?.authenticatedItem;
}
