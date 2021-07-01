import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 150px;
  padding: 0 80px 150px;
  background: #fff;
`;

export const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 40px;
  justify-content: center;
`;

export const SearchBar = styled.div<{ focus: boolean }>`
  max-width: 1520px;
  margin: 0 auto 50px;
  position: relative;
  transform: translateY(-50px);
  border: 5px solid
    ${({ focus }) => (focus ? 'rgba(117, 73, 212, 0.1)' : 'transparent')};
  border-radius: 30px;
  overflow: hidden;
  input {
    border-radius: 24px;
    background: #fff;
    border: 1px solid ${({ focus }) => (focus ? '#7f4acb' : '#edf0f4')};
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
    box-sizing: border-box;
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
