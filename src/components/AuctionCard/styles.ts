import styled from 'styled-components';

export const Card = styled.div<{ horizontal?: boolean }>`
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  background-color: #fff;
  border-radius: 30px;
  border: 1px solid #edf0f4;
  padding: 40px;
  display: flex;
  flex-direction: ${({ horizontal = false }) =>
    horizontal ? 'row' : 'column'};
  & > div:first-of-type {
    margin-bottom: ${({ horizontal = false }) => (horizontal ? 0 : 30)}px;
  }
  & > div:last-of-type {
    flex: 1;
    margin-left: ${({ horizontal = false }) => (horizontal ? 40 : 0)}px;
  }
`;

export const PlayIcon = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  transition: transform 0.15s ease-in-out;
  width: 80px;
  height: 80px;
`;

export const Thumb = styled.div`
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  height: 300px;
  &:hover {
    img:last-child {
      transform: translate(-50%, -50%) scale(1.1);
    }
  }
  flex: 1.2;
`;

export const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: inline-block;
`;

export const Author = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 26px;
`;

export const Name = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-left: 19px;
`;

export const Title = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 30px;
`;

export const Info = styled.div`
  background-color: #edf0f4;
  border-radius: 20px;
  padding: 30px 40px;
  font-size: 24px;
  font-weight: 500;
  display: flex;
  & > div:first-of-type {
    margin-right: 50px;
  }
`;

export const InfoTitle = styled.div`
  color: #88888b;
  margin-bottom: 20px;
`;
