import { BACKSPACE_NAME, ENGLISH, RUSSIAN, SHIFT_NAME, SPACE_NAME } from '../constants';
import englishLayout from '../data/keyboardData/englishLayout';
import russianLayout from '../data/keyboardData/russianLayout';

export const getLiClassnames = (
  damageLevel: string,
  isAttacking: boolean,
  optionName: string,
  styles: {
    readonly [key: string]: string;
  }
) => {
  return `${damageLevel === optionName ? styles.selected : ''} ${
    !isAttacking ? styles.isProtecting : ''
  }`;
};

export const getLanguageLayout = (language: string) => {
  switch (language) {
    case RUSSIAN:
      return russianLayout;

    case ENGLISH:
      return englishLayout;

    default:
      return russianLayout;
  }
};

export const proccessNewInput = (button: string, input: string, cursorPosition: number) => {
  let newInput = input;
  switch (button) {
    case BACKSPACE_NAME:
      if (cursorPosition > 0) {
        newInput = newInput.slice(0, cursorPosition - 1) + newInput.slice(cursorPosition);
      }
      break;

    case SHIFT_NAME:
      break;

    case SPACE_NAME:
      newInput = newInput.slice(0, cursorPosition) + ' ' + newInput.slice(cursorPosition);
      break;

    default:
      newInput = newInput.slice(0, cursorPosition) + button + newInput.slice(cursorPosition);
      break;
  }
  return newInput;
};

