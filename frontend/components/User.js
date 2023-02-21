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
  console.log(data?.authenticatedItem);
  return data?.authenticatedItem;
}
