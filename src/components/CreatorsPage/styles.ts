import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 150px;
  padding: 0 80px 150px;
  background: #fff;
`;

export const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, minmax(auto, 350px));
  grid-gap: 40px;
  justify-content: center;
`;

export const SearchBar = styled.div`
  max-width: 1520px;
  margin: 0 auto 50px;
  position: relative;
  transform: translateY(-50px);
  input {
    background: #fff;
    border: 1px solid #edf0f4;
    box-sizing: border-box;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
    border-radius: 30px;
    height: 100px;
    padding: 0 92px;
    width: 100%;
    font-size: 24px;
    font-weight: 500;
    font-family: Barlow, sans-serif;
    &::placeholder {
      color: #a1aab9;
    }
  }
`;

export const Loader = styled.div`
  position: absolute;
  right: 30px;
  top: 30px;
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 30px;
  top: 32px;
`;
