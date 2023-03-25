import styled from 'styled-components';

export const ProductStyles = styled.div`
  ${(props) => props.open && `transform: translateX(-20%)`};
  transition: 0.2s;
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
  z-index: -1;
  img {
    width: 300px;
    height: 300px;
    object-fit: cover;
  }
  @media only screen and (max-width: 1250px) and (min-width: 790px) {
    grid-template-columns: repeat(2, 350px);
    padding-left: 20rem;
  }
  @media only screen and (max-width: 790px) {
    ${(props) => props.open && `transform: translateX(0)`};
    display: grid;
    padding-top: 30%;
    grid-template-columns: repeat(1, 1fr);
  }
`;
