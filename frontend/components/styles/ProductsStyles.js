import styled from 'styled-components';

export const ProductStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  justify-items: center;
  text-align: center;
  font-size: large;
  font-weight: bold;
  margin: 0 auto;
  padding-top: 15%;
  img {
    width: 300px;
    height: 300px;
    object-fit: cover;
  }
  @media only screen and (max-width: 790px) {
    display: grid;
    padding-top: 30%;
    grid-template-columns: repeat(1, 1fr);
  }
`;
