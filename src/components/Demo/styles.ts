import styled from 'styled-components';

export const Container = styled.div`
  padding: 70px;
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f8fafc;
  justify-content: center;
`;

export const Title = styled.div`
  font-size: 99px;
  font-weight: 900;
  margin-bottom: 50px;
  text-align: center;
`;

export const PoweredBy = styled.div`
  max-width: 680px;
  background: #ffffff;
  border: 1px solid #edf0f4;
  box-sizing: border-box;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  border-radius: 30px;
  padding: 40px;
  width: 100%;
  position: relative;
  margin-bottom: 70px;
  @media (max-width: 768px) {
    padding: 30px 16px;
  }
`;

export const PoweredByTitle = styled.div`
  text-align: center;
  margin-bottom: 30px;
  font-size: 22px;
`;

export const Logos = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  img {
    display: block;
  }
  a {
    display: block;
  }
  & > div {
    &:first-of-type {
      padding-right: 33px;
      border-right: 1px solid #edf0f4;
    }
    &:last-of-type {
      padding-left: 26px;
    }
  }
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #edf0f4;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  border-radius: 30px;
  height: 100px;
  margin: 30px auto 0;
  background: #fff;
  @media (max-width: 768px) {
    height: 60px;
    border-radius: 20px;
    padding: 4px;
  }
  input {
    padding-left: 22px;
    padding-right: 7px;
    font-weight: 500;
    font-size: 24px;
    border: none;
    flex: 1;
    height: 100%;
    background: transparent;
    &::placeholder {
      color: #a1aab9;
    }
    @media (max-width: 768px) {
      font-size: 16px;
      padding-left: 12px;
    }
  }
`;
