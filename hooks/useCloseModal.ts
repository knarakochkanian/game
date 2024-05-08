import { useEffect } from 'react';

const useCloseModal = (
  modalIsOpen: boolean,
  setModalIsOpen: TSetBoolean,
  tag: string = 'aside',
  ignoringElement?: string
) => {
  const handleDocumentClick = (event: MouseEvent) => {
    if (modalIsOpen && !(event.target as Element).closest(tag)) {
      if (
        (event.target as Element).closest('dialog') ||
        (ignoringElement && (event.target as Element).closest(ignoringElement))
      ) {
        return;
      }

      setModalIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [modalIsOpen]);
};

export default useCloseModal;
