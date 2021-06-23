import styled from 'styled-components';

export const Title = styled.div`
  font-size: 66px;
  font-weight: 700;
  margin-bottom: 50px;
`;

export const Wrapper = styled.div`
  background: #fff;
  padding: 50px 0;
`;

export const Description = styled.div`
  font-size: 33px;
  margin-bottom: 50px;
  strong {
    text-decoration: underline;
    font-weight: 700;
  }
`;

export const UploadAvatar = styled.div`
  max-width: 320px;
  margin-right: 60px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  img {
    object-fit: cover;
    overflow: hidden;
    border-radius: 50px;
  }
`;

export const UploadButton = styled.label`
  border-radius: 20px;
  height: 60px;
  font-size: 18px;
  padding: 0 30px;
  background: #fff;
  border: 2px solid #edf0f4;
  color: #7f4acb;
  font-weight: bold;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    visibility: hidden;
  }
`;

export const UploadTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  margin-top: 50px;
`;

export const UploadDescription = styled.div`
  font-size: 22px;
  line-height: 26px;
  margin-bottom: 50px;
`;

export const Input = styled.label`
  margin-bottom: 50px;
  display: block;
  div:first-of-type {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  input {
    width: 100%;
    background: #ffffff;
    border: 2px solid #edf0f4;
    border-radius: 30px;
    padding: 0 30px;
    height: 80px;
    font-size: 24px;
    font-weight: 500;
    &::placeholder {
      color: #a1aab9;
    }
  }
  textarea {
    width: 100%;
    background: #ffffff;
    border: 2px solid #edf0f4;
    border-radius: 30px;
    padding: 30px;
    height: 240px;
    font-size: 24px;
    font-weight: 500;
    &::placeholder {
      color: #a1aab9;
    }
  }
`;

export const CoverDropzone = styled.div`
  background: #f8fafc;
  border: 4px dashed #edf0f4;
  border-radius: 30px;
  padding: 77px;
  font-size: 24px;
  line-height: 29px;
  font-weight: 500;
  text-align: center;
  color: #a1aab9;
  margin-bottom: 50px;
  position: relative;
  min-height: 269px;
  overflow: hidden;
  strong {
    font-weight: 700;
    margin-bottom: 20px;
    display: block;
  }
`;

export const CoverPreview = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const PrefixedInput = styled(Input)`
  position: relative;
  input {
    padding-left: 55px;
  }
`;

export const Prefix = styled.div`
  width: 80px;
  height: 80px;
  position: absolute;
  left: 0;
  bottom: 0;
  font-weight: 500;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a1aab9;
  padding-bottom: 4px;
`;
