import styled from '@emotion/styled';

export const SwiperWrapper = styled.div`
  width: 100%;
  height: 100%;

  .swiper-container {
    width: 100%;
    height: 100%;
    padding: 0 40px;
  }
  .swiper-button-disabled {
    opacity: 0;
  }
  .swiper-button-prev,
  .swiper-button-next {
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #fff;
    border: 1px solid #edf0f4;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
    z-index: 1000;
    background-position: center;
    background-repeat: no-repeat;
    top: 50%;
    transform: translateY(-50%);
  }
  .swiper-button-prev {
    left: 20px;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNC4yMDcxIDE2LjIwNzFDMTQuNTk3NiAxNS44MTY2IDE0LjU5NzYgMTUuMTgzNCAxNC4yMDcxIDE0Ljc5MjlMMTEuNDE0MiAxMkwxNC4yMDcxIDkuMjA3MTFDMTQuNTk3NiA4LjgxNjU4IDE0LjU5NzYgOC4xODM0MiAxNC4yMDcxIDcuNzkyODlDMTMuODE2NiA3LjQwMjM3IDEzLjE4MzQgNy40MDIzNyAxMi43OTI5IDcuNzkyODlMOS4yOTI4OSAxMS4yOTI5QzguOTAyMzcgMTEuNjgzNCA4LjkwMjM3IDEyLjMxNjYgOS4yOTI4OSAxMi43MDcxTDEyLjc5MjkgMTYuMjA3MUMxMy4xODM0IDE2LjU5NzYgMTMuODE2NiAxNi41OTc2IDE0LjIwNzEgMTYuMjA3MVoiIGZpbGw9IiMxNzE2MUEiLz4KPC9zdmc+Cg==');
  }
  .swiper-button-next {
    right: 20px;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik05Ljc5Mjg5IDcuNzkyODlDOS40MDIzNyA4LjE4MzQyIDkuNDAyMzcgOC44MTY1OCA5Ljc5Mjg5IDkuMjA3MTFMMTIuNTg1OCAxMkw5Ljc5Mjg5IDE0Ljc5MjlDOS40MDIzNyAxNS4xODM0IDkuNDAyMzcgMTUuODE2NiA5Ljc5Mjg5IDE2LjIwNzFDMTAuMTgzNCAxNi41OTc2IDEwLjgxNjYgMTYuNTk3NiAxMS4yMDcxIDE2LjIwNzFMMTQuNzA3MSAxMi43MDcxQzE1LjA5NzYgMTIuMzE2NiAxNS4wOTc2IDExLjY4MzQgMTQuNzA3MSAxMS4yOTI5TDExLjIwNzEgNy43OTI4OUMxMC44MTY2IDcuNDAyMzcgMTAuMTgzNCA3LjQwMjM3IDkuNzkyODkgNy43OTI4OVoiIGZpbGw9IiMxNzE2MUEiLz4KPC9zdmc+Cg==');
  }
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
  flex: 1;
  button {
    width: 100%;
  }
`;
