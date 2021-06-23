import { KeyboardEvent, RefObject, useCallback, useEffect } from 'react';

const useOnCloseByEsc = (
  ref: RefObject<HTMLDivElement>,
  onClose?: () => void
) => {
  const contentHasFocus = useCallback(
    () =>
      document.activeElement === ref.current ||
      ref.current?.contains(document.activeElement),
    [ref]
  );
  const focusContent = useCallback(
    () => ref.current && !contentHasFocus() && ref.current.focus(),
    [contentHasFocus, ref]
  );
  useEffect(() => {
    focusContent();
  }, [focusContent]);
  const handleKeydown = useCallback(
    (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose && onClose();
      }
    },
    [onClose]
  );
  return [handleKeydown];
};

export default useOnCloseByEsc;
