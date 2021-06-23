import React, { ReactNode, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import usePortal from 'hooks/usePortal';

const Transition = styled.div`
  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active {
    opacity: 1;
    transition: opacity 0.25s;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
    transition: opacity 0.25s;
  }
`;

const FadeModal = ({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: ReactNode;
}) => {
  const nodeRef = useRef(null);
  const target = usePortal('modal');
  return createPortal(
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={300}
      classNames="fade"
      unmountOnExit
    >
      <Transition ref={nodeRef}>{children}</Transition>
    </CSSTransition>,
    target
  );
};

export default FadeModal;
