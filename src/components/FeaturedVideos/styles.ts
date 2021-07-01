import styled from 'styled-components';

export const List = styled.div`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: 1fr 1fr;
  & > div:nth-of-type(3n + 1) {
    grid-column-end: span 2;
  }
`;

export const Title = styled.div`
  font-size: 33px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 22px;
`;
