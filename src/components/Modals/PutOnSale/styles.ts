import styled from '@emotion/styled';
import { Status } from './StatusBlock';

export const InputWrapper = styled.div`
  position: relative;
  height: 80px;
  border-radius: var(--chakra-radii-3xl);
  border: 2px solid #1d1f21;
  display: flex;
  padding: 10px;
  background: #fff;
  margin-left: -2px;
  margin-right: -2px;
  margin-bottom: -2px;
`;

export const BidInput = styled.input`
  border: none;
  font-size: 24px;
  font-weight: 500;
  width: 100%;
  padding: 0 20px;
  background: transparent;
`;

export const BidSelect = styled.select`
  font-size: 24px;
  font-weight: 500;
  width: 100%;
  padding: 0 20px;
  height: 80px;
  border-radius: var(--chakra-radii-3xl);
  border: 2px solid #1d1f21;
  background: #fff;
  margin-top: 24px;
`;

export const VIDBadge = styled.div`
  height: 100%;
  padding: 0px 10px;
  background: #1d1f21;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  color: #fff;
  font-size: 33px;
  font-weight: 700;
`;

export const Title = styled.div`
  font-size: 33px;
  font-weight: 700;
  margin-bottom: 30px;
`;

export const Row = styled.div`
  font-size: 22px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;

export const Label = styled.div`
  color: #a1aab9;
  font-weight: 500;
  strong {
    color: #17161a;
  }
`;

export const Value = styled.div`
  a {
    color: #7549d4;
  }
`;

export const ProgressBar = styled.div<{ status: Status }>`
  width: 100%;
  height: 60px;
  border-radius: 20px;
  background-color: #edf0f4;
  position: relative;
  margin-top: 30px;
  overflow: hidden;
  &::before {
    transition: 2s linear;
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${({ status }) => status * 25}%;
    background-color: ${({ status }) =>
      status === Status.error ? '#e2486a' : '#7549d4'};
  }
`;
