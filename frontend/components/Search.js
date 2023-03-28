import { gql, useLazyQuery } from '@apollo/client';
import { useState } from 'react';
import formatMoney from '../lib/formatMoney';
import { useSetState } from '../lib/stateProvider';
import { SearchStyles } from './styles/SearchStyles';

// TODO
// add close on out click

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
  const { isSearchActive, closeSearchList, toggleSearchList, closeCart } =
    useSetState();
  const [searchItems, { data, loading }] = useLazyQuery(SEARCH_QUERY, {
    fetchPolicy: 'no-cache',
  });
  const items = data?.products || [];
  const empty = data?.products?.length === 0;

  function handleChange(e) {
    setInputValue(e.target.value);
    searchItems({
      variables: {
        searchTerms: inputValue,
      },
    });
    toggleSearchList();
  }

  return (
    <SearchStyles active={isSearchActive}>
      <input
        onChange={handleChange}
        onClick={closeCart}
        type="text"
        name="search"
        placeholder="Search"
        className={`inputSearch ${isSearchActive ? 'active' : 'hidden'}`}
      />
      <div className={`listDiv ${isSearchActive ? 'active' : 'hidden'}`}>
        <button
          type="button"
          onClick={closeSearchList}
          onKeyDown={closeSearchList}
        >
          &times;
        </button>
        {empty && <p>We couldn't find that product. Try searching again!</p>}
        {items.map((item) => (
          <a
            href={`/product/${item.id}`}
            key={item.id}
            onClick={closeSearchList}
            onKeyDown={closeSearchList}
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
