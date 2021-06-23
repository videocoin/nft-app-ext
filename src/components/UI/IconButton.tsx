import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 80px;
  height: 80px;
  background: #ffffff;
  border: 1px solid #edf0f4;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  border-radius: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
`;

const IconButton = ({ children }: { children: ReactNode }) => {
  return <Button type="button">{children}</Button>;
};

export default IconButton;
