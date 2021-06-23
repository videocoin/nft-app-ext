import styled from 'styled-components';
import View from '../UI/View';

export const Logo = styled.div``;

export const Root = styled(View)`
  position: relative;
`;

Root.defaultProps = {
  row: true,
  centerV: true,
  spread: true,
  paddingH: 80,
  paddingV: 20,
};

export const NavBar = styled.div`
  position: absolute;
  background: #ffffff;
  border: 1px solid #edf0f4;
  box-sizing: border-box;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  border-radius: 30px;
  padding: 10px;
  left: 50%;
  transform: translateX(-50%);
  a {
    height: 60px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    min-width: 110px;
    font-weight: 700;
    background: #f8fafc;
    border-radius: 20px;
    &:not(:last-child) {
      margin-right: 10px;
    }
    &.active {
      background-color: #7549d4;
      color: #fff;
    }
  }
`;
