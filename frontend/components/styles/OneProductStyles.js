import styled from 'styled-components';

export const OneProductStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  margin: 0 auto;
  padding-top: 25%;
  height: 100vh;
  .product-info {
    padding-left: 2rem;
    text-align: left;
  }
  img {
    width: 500px;
    height: 500px;
    object-fit: cover;
  }
  h1 {
    font-size: 50px;
    font-weight: bolder;
  }
  p {
    font-size: medium;
    font-weight: bold;
  }
  .product-price {
    font-size: 30px;
    font-weight: bolder;
  }
  @media only screen and (max-width: 790px) {
    display: grid;
    padding-top: 30%;
    grid-template-columns: repeat(1, 1fr);
    justify-content: center;
    height: 100vh;
    img {
      justify-self: center;
      width: 300px;
      height: 300px;
      object-fit: cover;
    }
    .product-info {
      padding-left: 2rem;
      text-align: left;
    }
  }
`;
