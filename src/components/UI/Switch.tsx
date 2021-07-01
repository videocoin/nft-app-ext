import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const Wrapper = styled.label`
  border-radius: 20px;
  width: 120px;
  height: 60px;
  display: inline-block;
  overflow: hidden;
  cursor: pointer;
  input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    visibility: hidden;
    &:checked {
      & + div {
        background: #7549d4;
        border-color: #7549d4;
      }
      & + div + div {
        transform: translateX(60px);
        background: #fff;
      }
    }
  }

  position: relative;
  & > div:nth-child(2) {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #f8fafc;
    border: 1px solid #e4e8ed;
    border-radius: 20px;
    transition: 0.15s ease-in-out;
  }
  & > div:nth-child(3) {
    width: 40px;
    height: 40px;
    position: absolute;
    left: 10px;
    top: 10px;
    background: #7549d4;
    border-radius: 16px;
    transition: 0.15s ease-in-out;
  }
`;

const Switch = ({ register, name, ...props }: any) => {
  return (
    <Wrapper>
      <input type="checkbox" {...register(name)} {...props} />
      <div />
      <div />
    </Wrapper>
  );
};

export default Switch;
