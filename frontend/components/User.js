import { gql, useQuery } from '@apollo/client';

export const USER_QUERY = gql`
  query USER_QUERY {
    authenticatedItem {
      ... on User {
        id
        name
        email
        products {
          id
          name
          description
          photo {
            image {
              publicUrlTransformed
            }
          }
        }
        cart {
          id
          quantity
          product {
            id
            name
            price
            stock
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
