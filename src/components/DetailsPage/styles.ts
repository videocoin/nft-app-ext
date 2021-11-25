import styled from 'styled-components';

export const SocialItem = styled.a`
  width: 80px;
  height: 80px;
  background: #ffffff;
  border: 1px solid #edf0f4;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  border-radius: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export const Title = styled.div`
  font-size: 66px;
  font-weight: bold;
  margin-bottom: 50px;
`;

export const Bid = styled.div`
  background: #fff;
  border: 1px solid #edf0f4;
  box-sizing: border-box;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  border-radius: 30px;
  padding: 50px;
`;

export const BidOrder = styled.div`
  padding-top: 30px;
  margin-top: 10px;
`;

export const Countdown = styled.div`
  display: flex;
`;

export const CountdownValue = styled.div`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const SectionTitle = styled.div`
  font-size: 33px;
  font-weight: bold;
  padding-bottom: 30px;
  border-bottom: 1px solid #e4e8ed;
  margin-bottom: 30px;
`;

export const DescriptionText = styled.div`
  font-size: 24px;
  line-height: 1.4;
  p {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
`;

export const Edition = styled.div`
  font-size: 66px;
  font-weight: bold;
`;

export const CertItem = styled.a`
  background: #fff;
  border: 1px solid #edf0f4;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  border-radius: 30px;
  padding: 20px 30px;
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 10px;
  cursor: pointer;
  img {
    margin-right: 30px;
  }
`;

export const HistoryItem = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #edf0f4;
  box-sizing: border-box;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 20px 30px;
`;
export const HistoryPlaced = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
  span {
    color: #7549d4;
  }
`;
export const HistoryDate = styled.div`
  font-size: 24px;
  font-weight: 500;
  opacity: 0.5;
`;
export const HistoryVid = styled.div`
  font-size: 33px;
  font-weight: bold;
  margin-bottom: 9px;
  text-align: right;
`;
export const HistoryUsd = styled.div`
  font-size: 24px;
  opacity: 0.5;
  text-align: right;
`;
export const Wrapper = styled.div`
  background: #f8fafc;
  margin-top: -48px;
  padding-top: 48px;
  padding-bottom: 140px;
  position: relative;
  & > div {
    max-width: 1140px;
    margin: 0 auto;
  }
  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    max-height: 540px;
    border-radius: 20px;
  }
  & > div > button {
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: #fff;
    border: 1px solid #edf0f4;
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.06);
    z-index: 100;
    left: 19px;
    span {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .prev-btn {
    span {
      padding-right: 4px;
    }
  }
  .next-btn {
    left: auto;
    right: 19px;
  }

  .swiper-wrapper {
    align-items: center;
  }
  .swiper-container {
    padding: 48px 240px;
  }
  .swiper-slide {
    border-radius: 20px;

    img,
    video {
      border-radius: 20px;
    }
  }
`;

export const Modal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(29, 31, 33, 0.2);
  display: flex;
  flex-direction: column;
  padding: 120px;
  align-items: center;
  z-index: 1000;
`;

export const AuthorBar = styled.div`
  position: relative;
  z-index: 10;
`;

export const FileCoinPopup = styled.div`
  width: 820px;
  background: #fff;
  border-radius: 30px;
  padding: 30px;
  position: relative;
`;

export const EncryptionPopup = styled.div`
  width: 540px;
  background: #fff;
  border-radius: 30px;
  padding: 30px;
  position: relative;
`;

export const EncryptionPopupTitle = styled.div`
  font-size: 33px;
  font-weight: 700;
  margin-bottom: 30px;
`;

export const EncryptionAddress = styled.div`
  background: #ffffff;
  border: 1px solid #edf0f4;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  border-radius: 30px;
  color: #7549d4;
  font-size: 33px;
  height: 120px;
  display: flex;
  align-items: center;
  padding: 30px;
  position: relative;
`;

export const CloseBtn = styled.button`
  background: #ffffff;
  border: 1px solid #edf0f4;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  width: 60px;
  height: 60px;
  position: absolute;
  right: 20px;
  top: 20px;
`;

export const CopyBtn = styled.button`
  background: #ffffff;
  border: 1px solid #edf0f4;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  border-radius: 30px;
  width: 80px;
  height: 80px;
  position: absolute;
  right: 20px;
  top: 20px;
`;

export const FileCoinRow = styled.div`
  display: flex;
  border-bottom: 1px solid #e4e8ed;
  padding: 18px 0;
`;
export const FileCoinLabel = styled.div`
  width: 290px;
  font-size: 22px;
  font-weight: bold;
  flex-shrink: 0;
`;
export const FileCoinValue = styled.div`
  font-size: 22px;
  color: #7549d4;
`;

export const FileCoinViewBtn = styled.div`
  margin-top: 30px;
  & > * {
    width: 100%;
    & > * {
      width: 100%;
    }
  }
`;

export const WrongToken = styled.div`
  font-size: 33px;
  text-align: center;
  margin-top: 100px;
  margin-bottom: 400px;
  font-weight: bold;
`;

export const OwnerName = styled.div`
  font-weight: 700;
  margin-left: 20px;
  font-size: 24px;
`;
