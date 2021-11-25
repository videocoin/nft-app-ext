import styled from 'styled-components';

export const Video = styled.div`
  max-width: 900px;
  flex: 2;
  margin-right: 40px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  position: relative;
  max-height: 540px;
  background: #000;
  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 20px;
  }
`;

export const Content = styled.div`
  width: 580px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  background: #fff;
  padding: 40px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
`;
