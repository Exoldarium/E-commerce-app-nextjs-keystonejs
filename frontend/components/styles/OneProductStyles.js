import styled from 'styled-components';

export const OneProductStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  justify-items: center;
  text-align: center;
  font-size: medium;
  font-weight: bold;
  margin: 0 auto;
  padding-top: 25%;
  img {
    width: 500px;
    height: 500px;
    object-fit: cover;
  }
  @media only screen and (max-width: 790px) {
    display: grid;
    padding-top: 30%;
    grid-template-columns: repeat(1, 1fr);
    img {
      width: 300px;
      height: 300px;
      object-fit: cover;
    }
  }
`;
