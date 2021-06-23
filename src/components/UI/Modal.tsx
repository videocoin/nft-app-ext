import React, { ReactNode, useCallback, useRef } from 'react';
import useOnCloseByEsc from 'hooks/useOnCloseByEsc';
import useLockBodyScroll from 'hooks/useLockBodyScroll';
import styled from 'styled-components';
export interface ModalProps {
  children: ReactNode;
  onClose?: () => void;
  lockScroll?: boolean;
  closeOnEsc?: boolean;
  width?: string;
}

export const Wrapper = styled.div<{ lockScroll?: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow-y: ${({ lockScroll }) => (lockScroll ? 'hidden' : 'auto')};
  padding: 32px 50px;
  min-height: 100vh;
  z-index: 1000;
  background-color: rgba(29, 31, 33, 0.3);
  & > div {
    display: flex;
    margin: 0 auto;
  }
`;

export const Inner = styled.div<{ $width?: string }>`
  width: 100%;
  max-width: ${({ $width = '456px' }) => $width};
`;

export const Dialog = styled.div`
  margin: 100px auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #edf0f4;
  box-sizing: border-box;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  border-radius: 30px;
  padding: 30px;
  align-self: flex-start;
`;

const ModalContainer = ({
  children,
  lockScroll,
  onClose,
  width,
}: ModalProps) => {
  const shouldClose = useRef<boolean | null>(null);
  useLockBodyScroll({ lockScroll });
  const content = useRef<HTMLDivElement>(null);
  const handleOverlayClick = useCallback(() => {
    if (shouldClose.current === null) {
      shouldClose.current = true;
    }
    if (shouldClose.current) {
      if (onClose) onClose();
    }
    shouldClose.current = null;
  }, [onClose]);
  const [handleKeyDown] = useOnCloseByEsc(content, onClose);
  const handleContentOnClick = () => {
    shouldClose.current = false;
  };

  const handleContentOnMouseDown = () => {
    shouldClose.current = false;
  };
  const handleContentOnMouseUp = () => {
    shouldClose.current = false;
  };

  return (
    <Wrapper onClick={handleOverlayClick}>
      <Inner
        $width={width}
        ref={content}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        onMouseDown={handleContentOnMouseDown}
        onMouseUp={handleContentOnMouseUp}
        onClick={handleContentOnClick}
      >
        {children}
      </Inner>
    </Wrapper>
  );
};

const Modal = ({
  lockScroll,
  onClose,
  children,
  width = '540px',
}: ModalProps) => {
  return (
    <ModalContainer width={width} onClose={onClose} lockScroll={lockScroll}>
      <Dialog>{children}</Dialog>
    </ModalContainer>
  );
};

export default Modal;
