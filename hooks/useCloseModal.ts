import { useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { PayloadAction } from '@reduxjs/toolkit';
import { getModalCloseValue } from '../helpers/helpers_2';

const useCloseModal = (
  modalIsOpen: boolean,
  setModalIsOpen?: TSetBoolean,
  tag: string = 'aside',
  ignoringElement?: string,
  statusDataType?: string | number | boolean,
  dispatchModalIsOpen?: (
    payload: number
  ) => PayloadAction<string | number | boolean | undefined, string>
) => {
  const dispatch = useAppDispatch();
  let modalCloseValue = getModalCloseValue(statusDataType);

  const handleDocumentClick = (event: MouseEvent) => {
    if (modalIsOpen && !(event.target as Element).closest(tag)) {
      if (
        (event.target as Element).closest('dialog') ||
        (ignoringElement &&
          (event.target as Element).closest(ignoringElement)) ||
        ('button' && (event.target as Element).closest('button'))
      ) {
        return;
      }

      if (setModalIsOpen) {
        setModalIsOpen(false);
      } else if (dispatchModalIsOpen && statusDataType === 'number') {
        dispatch(dispatchModalIsOpen(-1));
      }
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
