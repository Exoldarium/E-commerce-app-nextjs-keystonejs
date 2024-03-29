import styled from 'styled-components';

export const OneProductStyles = styled.div`
  transition: 0.2s;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(100px, auto);
  margin: 0 auto;
  padding-top: 25%;
  height: 100vh;
  .product-info {
    padding-left: 5rem;
    text-align: left;
    button {
      padding: 1rem;
      background: var(--peach);
      border-radius: 10px;
      box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
      border: none;
      color: white;
      font-size: 15px;
      margin: 0 auto;
    }
  }
  img {
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.4);
    border-radius: 10px;
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
