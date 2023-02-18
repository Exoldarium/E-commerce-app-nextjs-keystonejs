import { gql, useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import formatMoney from '../lib/formatMoney';
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
      price
      description
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

  console.log(data);

  return (
    <SearchStyles>
      <input
        onChange={handleChange}
        type="text"
        name="search"
        placeholder="Search"
      />
      <div className="listDiv">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => router.push(`/product/${item.id}`)}
            className="singleList"
          >
            <img
              src={item.photo.image.publicUrlTransformed}
              alt={item.name}
              width="100"
              key={item.id}
            />
            <p>{item.name}</p>
            <p>{formatMoney(item.price)}</p>
          </div>
        ))}
      </div>
    </SearchStyles>
  );
}
