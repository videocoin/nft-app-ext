import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
  padding-top: 50px;
  background: #fff;
  padding-bottom: 100px;
`;

export const Title = styled.div`
  font-size: 66px;
  text-align: center;
  font-weight: 700;
  margin-bottom: 50px;
`;

export const Description = styled.div`
  font-size: 33px;
  line-height: 46px;
  text-align: center;
  margin-bottom: 50px;
  strong {
    font-weight: 700;
  }
`;

export const LinkCard = styled(Link)`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #ffffff;
  border: 1px solid #edf0f4;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.06);
  border-radius: 30px;
  padding: 40px;
  & > div {
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;
    margin-bottom: 50px;
  }
  &:first-of-type {
    margin-right: 40px;
    & > div {
      background: linear-gradient(66.96deg, #7549d4 0%, #e2486a 100%);
    }
  }
  &:last-child {
    & > div {
      background: linear-gradient(66.96deg, #ed6858 0%, #f09051 100%);
    }
  }
`;

export const Hint = styled.div`
  text-align: center;
  margin-top: 50px;
`;
