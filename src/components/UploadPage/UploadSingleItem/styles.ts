import styled from 'styled-components';

export const Wrapper = styled.div`
  background: #fff;
  padding-top: 50px;
  padding-bottom: 50px;
  & > div {
    max-width: 1400px;
    margin: 0 auto;
  }
`;

export const Title = styled.div`
  font-size: 66px;
  font-weight: 700;
  padding-bottom: 50px;
  border-bottom: 1px solid #e4e8ed;
  margin-bottom: 50px;
`;

export const Inner = styled.div`
  display: flex;
  align-items: flex-start;
`;
export const Left = styled.div`
  width: 740px;
  margin-right: 120px;
`;

export const Preview = styled.div`
  position: sticky;
  top: 50px;
  background: #ffffff;
  border: 1px solid #edf0f4;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.06);
  border-radius: 30px;
  width: 540px;
  padding: 40px;
  video {
    height: 300px;
    width: 100%;
    object-fit: cover;
    margin-bottom: 40px;
    border-radius: 16px;
  }
`;

export const PreviewBadge = styled.div`
  background: #7549d4;
  border-radius: 16px;
  color: #fff;
  font-size: 13px;
  font-weight: 900;
  text-transform: uppercase;
  display: inline-block;
  padding: 13px 23px;
  margin-bottom: 40px;
`;

export const PreviewDesc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  background: #f8fafc;
  border-radius: 20px;
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  color: #a1aab9;
  margin-bottom: 40px;
  svg {
    margin-bottom: 20px;
  }
`;

export const PreviewName = styled.div`
  font-size: 33px;
  font-weight: 700;
  line-height: 40px;
`;

export const Section = styled.div`
  margin-bottom: 50px;
`;
export const Label = styled.div`
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  margin-bottom: 20px;
`;
export const Dropzone = styled.div`
  background: #f8fafc;
  border: 4px dashed #edf0f4;
  min-height: 258px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 0;
  text-align: center;
  p {
    font-size: 24px;
    color: #a1aab9;
    margin-top: 20px;
    strong {
      display: block;
      margin-bottom: 20px;
      font-weight: 700;
    }
    span {
      color: #7549d4;
    }
  }
`;

export const Input = styled.input<{ hasError?: boolean }>`
  background: #ffffff;
  border: 2px solid ${({ hasError }) => (hasError ? 'red' : '#edf0f4')};
  border-radius: 30px;
  padding: 0 30px;
  height: 80px;
  font-size: 24px;
  font-weight: 500;
  width: 100%;
  &::placeholder {
    color: #a1aab9;
  }
`;
export const Textarea = styled.textarea`
  background: #ffffff;
  border: 2px solid #edf0f4;
  border-radius: 30px;
  padding: 0 30px;
  min-height: 80px;
  font-size: 24px;
  font-weight: 500;
  width: 100%;
  padding-top: 15px;
  &::placeholder {
    color: #a1aab9;
  }
`;

export const BidSettings = styled.div`
  border-top: 1px solid #e4e8ed;
  border-bottom: 1px solid #e4e8ed;
  padding: 50px 0;
  font-size: 24px;
  line-height: 28px;
  margin-bottom: 50px;
`;

export const Progress = styled.div`
  width: 120px;
  height: 120px;
`;

export const Error = styled.div`
  color: red;
  margin-top: 12px;
`;

export const StatusModalTitle = styled.div`
  font-size: 33px;
  font-weight: 700;
  margin-bottom: 30px;
`;

export const StatusItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;
export const StatusStep = styled.div<{ active: boolean }>`
  background: ${({ active }) => (active ? '#7549D4' : '#f8fafc')};
  border: 1px solid ${({ active }) => (active ? '#7549D4' : '#edf0f4')};
  box-sizing: border-box;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: bold;
  margin-right: 20px;
`;
export const StatusDesc = styled.div`
  font-size: 19px;
  & > div {
    &:first-of-type {
      font-weight: bold;
      margin-bottom: 10px;
    }
  }
`;

export const StatusSpinner = styled.div`
  transition: all 0.3s linear;
  flex-shrink: 0;
  animation: spinner-spin 1s linear infinite;
  border: 5px solid #edf0f4;
  border-top: 5px solid #7549d4;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin-right: 20px;
  @keyframes spinner-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const OpenButton = styled.div`
  button {
    width: 100%;
  }
`;

export const Fee = styled.div`
  font-size: 18px;
  margin-top: 12px;
`;
