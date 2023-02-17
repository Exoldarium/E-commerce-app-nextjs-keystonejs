import { gql, useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SearchStyles } from './styles/SearchStyles';

const SEARCH_QUERY = gql`
  query SEARCH_QUERY($searchTerms: String!) {
    products(
      where: {
        OR: [
          { name: { contains: $searchTerms } }
          { description: { contains: $searchTerms } }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Search() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const [searchItems, { data, loading, error }] = useLazyQuery(SEARCH_QUERY, {
    fetchPolicy: 'no-cache',
  });
  const items = data?.products || [];

  function handleChange(e) {
    setInputValue(e.target.value);
    searchItems({
      variables: {
        searchTerms: inputValue,
      },
    });
  }

  function onClick() {
    router.push(`/product/${items.id}`);
  }

  console.log(data);

  return (
    <SearchStyles>
      <div>
        <input onChange={handleChange} />
      </div>
      <div>
        {items.map((item) => (
          <div key={item.id} onClick={() => router.push(`/product/${item.id}`)}>
            <img
              src={item.photo.image.publicUrlTransformed}
              alt={item.name}
              width="50"
              key={item.id}
            />
            {item.name}
          </div>
        ))}
      </div>
    </SearchStyles>
  );
}
