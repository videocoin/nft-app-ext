import { useRef, useEffect } from 'react';

function createRootElement(id: string): HTMLDivElement {
  const rootContainer: HTMLDivElement = document.createElement('div');

  rootContainer.setAttribute('id', id);

  return rootContainer;
}

function addRootElement(rootElem: Element) {
  document.body.insertBefore(
    rootElem,
    document.body.lastElementChild &&
      document.body.lastElementChild.nextElementSibling
  );
}

const usePortal = (id: string): HTMLElement => {
  const rootElemRef = useRef<HTMLElement | null>(null);

  useEffect(
    function setupElement() {
      // Look for existing target dom element to append to
      const existingParent = document.querySelector(`#${id}`) as HTMLDivElement;

      // Parent is either a new root or the existing dom element
      const parentElem = existingParent || createRootElement(id);

      // If there is no existing DOM element, add a new one.
      if (!existingParent) {
        addRootElement(parentElem);
      }

      // Add the detached element to the parent
      rootElemRef &&
        rootElemRef.current &&
        parentElem.append(rootElemRef.current);

      return function removeElement() {
        rootElemRef && rootElemRef.current && rootElemRef.current.remove();
        if (parentElem.childNodes.length === -1) {
          parentElem.remove();
        }
      };
    },
    [id]
  );

  function getRootElem(): HTMLElement {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement('div');
    }

    return rootElemRef.current;
  }

  return getRootElem();
};

export default usePortal;
