import styled from 'styled-components';

export const List = styled.div`
  padding: 30px 20px;
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  & > div {
    margin: 0 20px;
    min-width: 540px;
    &:last-child {
      padding-right: 40px;
      min-width: 580px;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Title = styled.div`
  display: flex;
  font-size: 33px;
  font-weight: bold;
  align-items: center;
  &::before {
    content: '';
    background: linear-gradient(
      270deg,
      #7549d4 0%,
      #e2486a 35.94%,
      #ed6858 69.79%,
      #f09051 100%
    );
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 15px;
  }
`;
