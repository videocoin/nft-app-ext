import styled from 'styled-components';
import { css } from 'styled-components';
import { Size } from './share';

const xxs = css`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: 4px solid #fff;
`;

const sm = css`
  width: 68px;
  height: 68px;
  border-radius: 20px;
  border: 4px solid #fff;
`;

const md = css`
  width: 88px;
  height: 88px;
  border-radius: 30px;
  border: 4px solid #ffffff;
`;
const lg = css`
  width: 116px;
  height: 116px;
  border-radius: 30px;
  border: 8px solid #ffffff;
`;
const xl = css`
  width: 196px;
  height: 196px;
  border-radius: 50px;
  border: 16px solid #ffffff;
`;

const sizes: Record<Size, any> = {
  xxs,
  sm,
  md,
  lg,
  xl,
};

export const Avatar = styled.div<{ size: Size }>`
  ${({ size }) => sizes[size]};
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: inline-block;
  }
`;
