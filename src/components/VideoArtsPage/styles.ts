import styled from 'styled-components';

export const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, minmax(auto, 350px));
  grid-gap: 40px;
  justify-content: center;
`;

export const Wrapper = styled.div`
  margin-top: 150px;
  padding: 0 80px 150px;
  background: #fff;
`;
