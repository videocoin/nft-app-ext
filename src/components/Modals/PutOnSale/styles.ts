import styled from 'styled-components';

export const Title = styled.div`
  font-size: 33px;
  font-weight: 700;
  margin-bottom: 30px;
`;

export const AssetPreview = styled.div`
  border-bottom: 1px solid #edf0f4;
  padding-bottom: 30px;
  img {
    border-radius: 20px;
    object-fit: cover;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  }
`;
export const Username = styled.div`
  font-size: 19px;
  font-weight: 700;
  line-height: 23px;
`;

export const AssetName = styled.div`
  font-size: 24px;
  line-height: 29px;
  font-weight: 700;
`;

export const InputWrapper = styled.div`
  position: relative;
  height: 80px;
  border-radius: 30px;
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

export const BidBlock = styled.div`
  background: #f8fafc;
  border: 2px solid #edf0f4;
  border-radius: 30px;
  font-size: 24px;
  line-height: 29px;
  padding-top: 20px;
  margin: 30px 0;
`;

export const MinBidTitle = styled.div`
  text-align: center;
  margin-bottom: 10px;
`;

export const MinBid = styled.div`
  text-align: center;
  font-weight: 700;
  margin-bottom: 20px;
`;

export const MinBidFooter = styled.div`
  text-align: center;
  margin-bottom: 20px;
  font-size: 22px;
  line-height: 31px;
  margin: 40px -30px;
`;

export const VIDBadge = styled.div`
  height: 100%;
  width: 110px;
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

export const USDValue = styled.div`
  text-align: center;
  font-size: 22px;
  line-height: 31px;
  color: #17161a80;
  padding-bottom: 30px;
  border-bottom: 1px solid #edf0f4;
`;

export const Balance = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 22px;
  line-height: 26px;
  padding: 18px 0;
  & > div:first-child {
    font-weight: 700;
  }
`;

export const Footer = styled.div`
  background: #f8fafc;
  text-align: center;
  font-size: 22px;
  line-height: 31px;
  margin: 40px -30px -30px;
  padding: 20px 0;
`;

export const StatusTitle = styled.div`
  font-size: 19px;
  font-weight: 700;
  margin-bottom: 10px;
`;

export const StatusDescription = styled.div`
  font-size: 19px;
`;