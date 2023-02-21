import styled from 'styled-components';

export const CartSliderStyles = styled.div`
  transform: translateX(100%);
  ${(props) => props.open && `transform: translateX(0)`};
  position: fixed;
  right: 0;
  top: 0rem;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  background: white;
  width: 30%;
  margin: 0 auto;
`;
