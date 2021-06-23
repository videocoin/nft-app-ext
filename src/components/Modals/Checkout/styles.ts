import styled from 'styled-components';
import { Status } from 'components/Modals/Checkout/StatusBlock';

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

export const Head = styled.div`
  font-size: 22px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  border-bottom: 1px solid #e4e8ed;
  padding: 20px 0;
  margin-bottom: 10px;
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

export const VerificationAlert = styled.div`
  background: rgba(226, 72, 106, 0.08);
  border-radius: 20px;
  padding: 26px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 19px;
  color: #e2486a;
  margin-top: 20px;
  & > div:first-child {
    div:first-child {
      font-weight: 700;
      margin-bottom: 10px;
    }
  }
`;

export const StatusTitle = styled.div`
  font-size: 19px;
  font-weight: 700;
  margin-bottom: 10px;
`;

export const StatusDescription = styled.div`
  font-size: 19px;
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
