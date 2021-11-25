import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 150px;
  padding: 0 80px 150px;
  &::before {
    content: '';
    display: block;
    position: absolute;
    pointer-events: none;
    width: 100%;
    background: #f8fafc;
    height: 256px;
    left: 0;
    top: 0;
    z-index: -1;
  }
`;

export const SearchBar = styled.div<{ focus: boolean }>`
  max-width: 1520px;
  margin: -70px auto 50px;
  position: relative;
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
