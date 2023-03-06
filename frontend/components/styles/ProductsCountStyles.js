import styled from 'styled-components';

export const ProductsCountStyles = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  a[aria-disabled='true'] {
    pointer-events: none;
    opacity: 0.6;
  }
  a {
    border: 1px solid black;
    padding: 1rem;
  }
  div {
    text-align: center;
    margin: 1rem;
  }
`;
