import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Card = styled(Link)`
  display: block;
  background: #fff;
  border: 1px solid #edf0f4;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  min-height: 410px;
`;

export const Bg = styled.div`
  height: 195px;
  border-radius: 20px 20px 0 0;
  img {
    border-radius: 20px 20px 0 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: inline-block;
  }
`;

export const Content = styled.div`
  padding: 0 30px 46px;
  margin-top: -60px;
  position: relative;
`;

export const Name = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-top: 35px;
  margin-bottom: 12px;
`;

export const Nickname = styled.div`
  font-size: 24px;
  line-height: 40px;
  white-space: nowrap;
  display: inline-block;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  background: linear-gradient(
    270deg,
    #7549d4 0%,
    #e2486a 35.94%,
    #ed6858 69.79%,
    #f09051 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
