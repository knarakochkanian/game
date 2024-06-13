import { RefObject, useEffect } from 'react';

const useKeyboardLayoutEffects = (
  searchInputRef: RefObject<HTMLInputElement>,
  cursorPosition: number,
  setCursorPosition: TSetNumber,
  input: string,
  setInput: TSetString,
  keyboardRef: TKeyboardRefFunc
) => {
  useEffect(() => {
    const inputElement = searchInputRef?.current;
    if (inputElement) {
      const handleMouseUp = () => {
        setCursorPosition(inputElement.selectionStart || 0);
      };

      inputElement.addEventListener('mouseup', handleMouseUp);

      return () => {
        inputElement.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [searchInputRef]);

  useEffect(() => {
    if (keyboardRef) {
      keyboardRef({
        setSearchInput: (input: string) => {
          setInput(input);
        },
      });
    }
  }, [keyboardRef]);

  useEffect(() => {
    const inputElement = searchInputRef?.current;
    if (inputElement) {
      inputElement.focus();
      setTimeout(() => {
        setCursorPosition(inputElement.value.length);
        inputElement.setSelectionRange(
          inputElement.value.length,
          inputElement.value.length
        );
      }, 100);
    }
  }, []);

  useEffect(() => {
    const inputElement = searchInputRef?.current;
    if (inputElement) {
      inputElement.setSelectionRange(cursorPosition, cursorPosition);
    }
  }, [input, cursorPosition]);
};

export default useKeyboardLayoutEffects;
