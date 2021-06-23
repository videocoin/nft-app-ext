import styled from 'styled-components';

export const Header = styled.div`
  height: 340px;
  margin-top: -140px;
  margin-bottom: -100px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Title = styled.div`
  font-size: 66px;
  font-weight: bold;
  margin-bottom: 50px;
`;

export const Username = styled.div`
  font-size: 32px;
  display: inline-block;
  font-weight: 700;
  background: linear-gradient(
    270deg,
    #7549d4 0%,
    #e2486a 35.94%,
    #ed6858 69.79%,
    #f09051 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 50px;
`;

export const Address = styled.div`
  background: #ffffff;
  display: inline-flex;
  align-items: center;
  border: 1px solid #edf0f4;
  box-sizing: border-box;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  border-radius: 30px;
  padding: 24px 30px;
  font-size: 33px;
  min-width: 540px;
  justify-content: space-between;
  font-weight: 500;
  margin-bottom: 100px;
`;

export const AddressVal = styled.div`
  color: #7549d4;
  font-weight: normal;
  margin-top: 20px;
`;

export const Profile = styled.div`
  background: #fff;
`;
