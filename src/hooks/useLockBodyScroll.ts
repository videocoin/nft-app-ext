import { useLayoutEffect } from 'react';

function getScrollbarWidth(): number {
  const isScrollEmpty = (document.body.style.overflowY = 'scroll');

  if (document.body.clientHeight <= window.innerHeight && !isScrollEmpty) {
    return 0;
  }

  const outer = document.createElement('div');
  const inner = document.createElement('div');

  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;

  outer.style.overflowY = 'scroll';
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;

  if (outer.parentNode) {
    outer.parentNode.removeChild(outer);
  }

  return widthNoScroll - widthWithScroll;
}

// TODO add prevent lock if lock already locked
function useLockBodyScroll(props: any = {}): void {
  const { onlyMobile = false, fixed = false, lockScroll = true } = props;
  useLayoutEffect(() => {
    if (!lockScroll) return;
    if (onlyMobile && window.innerWidth > 768) {
      return () => false;
    }
    const prevOverflow = document.body.style.overflow;
    const scrollPosition = window.scrollY;

    document.body.style.paddingRight = `${getScrollbarWidth()}px`;
    document.body.style.overflowY = 'hidden';
    document.body.style.position = fixed ? 'fixed' : 'absolute';
    document.body.style.height = '100%';
    document.body.style.width = '100%';

    return () => {
      if (!lockScroll) return;
      document.body.style.paddingRight = '';
      document.body.style.overflowY = prevOverflow || 'scroll';
      document.body.style.height = '';
      document.body.style.width = '';
      document.body.style.position = '';
      window.scrollTo(0, scrollPosition);
    };
  }, [fixed, lockScroll, onlyMobile]);
}

export default useLockBodyScroll;
