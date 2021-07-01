import styled from 'styled-components';

export const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(auto, 540px));
  grid-gap: 40px;
  justify-content: center;
  margin-bottom: 100px;
`;

export const Wrapper = styled.div`
  margin-top: 150px;
  padding: 0 80px 150px;
`;

export const Header = styled.div`
  background: #f8fafc;
  padding-top: 200px;
  margin-top: -100px;
  margin-bottom: 100px;
`;
