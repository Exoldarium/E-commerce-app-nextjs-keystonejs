import styled from 'styled-components';

// TODO
// center pagination buttons

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
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.4);
    border-radius: 10px;
    padding: 1rem;
    background: white;
  }
  div {
    text-align: center;
    margin: 1rem;
  }
`;
