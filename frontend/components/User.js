import { gql, useQuery } from '@apollo/client';

export const USER_QUERY = gql`
  query USER_QUERY {
    authenticatedItem {
      ... on User {
        id
        name
      }
    }
  }
`;

export function useUser() {
  const { data } = useQuery(USER_QUERY);
  return data;
}
