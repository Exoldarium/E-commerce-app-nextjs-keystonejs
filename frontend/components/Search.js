import { gql, useLazyQuery } from '@apollo/client';
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
  const [inputValue, setInputValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [searchItems, { data, loading }] = useLazyQuery(SEARCH_QUERY, {
    fetchPolicy: 'no-cache',
  });
  const items = data?.products || [];
  const empty = data?.products?.length === 0;
  const onFocus = () => setIsActive(true);

  function handleChange(e) {
    setInputValue(e.target.value);
    searchItems({
      variables: {
        searchTerms: inputValue,
      },
    });
  }

  return (
    <SearchStyles active={isActive}>
      <input
        onChange={handleChange}
        onFocus={onFocus}
        type="text"
        name="search"
        placeholder="Search"
        className={`inputSearch ${isActive ? 'active' : 'hidden'}`}
      />
      <div className={`listDiv ${isActive ? 'active' : 'hidden'}`}>
        <button
          type="button"
          onClick={() => setIsActive(false)}
          onKeyDown={() => setIsActive(false)}
        >
          X
        </button>
        {empty && <p>We couldn't find that product. Try searching again!</p>}
        {items.map((item) => (
          <a
            href={`/product/${item.id}`}
            key={item.id}
            onClick={() => {
              setIsActive(false);
            }}
            onKeyDown={() => {
              setIsActive(false);
            }}
            className="singleList"
          >
            <img
              src={item.photo.image.publicUrlTransformed}
              alt={item.name}
              key={item.id}
            />
            <p>{item.name}</p>
            <p>{formatMoney(item.price)}</p>
          </a>
        ))}
      </div>
    </SearchStyles>
  );
}
