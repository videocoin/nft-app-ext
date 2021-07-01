import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';

type Size = 'sm' | 'md' | 'lg';
type Theme = 'primary' | 'secondary' | 'gradient';

const sm = css`
  height: 60px;
  font-size: 18px;
  padding: 0 30px;
`;

const md = css`
  height: 80px;
  font-size: 24px;
  padding: 0 60px;
  border-radius: 30px;
`;
const lg = css`
  height: 100px;
  font-size: 24px;
  padding: 0 60px;
  border-radius: 30px;
`;

const primary = css`
  background: linear-gradient(
    275.14deg,
    #7549d4 0%,
    #e2486a 35.94%,
    #ed6858 69.79%,
    #f09051 100%
  );
  color: #fff;
  &:disabled {
    background: #a1aab9;
  }
  transition: border-color 200ms ease 0s, color 200ms ease 0s,
    background-color 200ms ease 0s, background-position-x 400ms ease-in-out 0s;

  &:hover {
    background-position-x: 2%;
  }
`;

const secondary = css`
  background: #fff;
  border: 2px solid #edf0f4;
  color: #7f4acb;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.06);
  transition: border-color 0.15s ease-in-out;
  &:hover {
    border-color: #7f4acb;
  }
`;

const gradient = css`
  background: #ffffff;
  border: 1px solid #edf0f4;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.06);
  border-radius: 30px;
  span {
    background: linear-gradient(
      270deg,
      #7549d4 0%,
      #e2486a 35.94%,
      #ed6858 69.79%,
      #f09051 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const sizes: Record<Size, any> = {
  sm,
  md,
  lg,
};

const themes: Record<Theme, any> = {
  primary,
  secondary,
  gradient,
};

const ButtonBase = styled.button<{ size: Size; btnTheme: Theme }>`
  border-radius: 20px;
  ${({ size }) => sizes[size]};
  ${({ btnTheme }) => themes[btnTheme]};
  font-weight: bold;
  white-space: nowrap;
`;
ButtonBase.defaultProps = { type: 'button' };

const Button = ({
  size = 'sm',
  theme = 'primary',
  ...rest
}: {
  size?: Size;
  theme?: Theme;
} & ButtonHTMLAttributes<HTMLButtonElement>) => (
  <ButtonBase size={size} btnTheme={theme} {...rest} />
);

export default Button;
