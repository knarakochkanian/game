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

export const proccessNewInput = (button: string, newInput: string) => {
  switch (button) {
    case BACKSPACE_NAME:
      newInput = newInput.slice(0, -1);
      return newInput;

    case SHIFT_NAME:
      return newInput;

    case SPACE_NAME:
      newInput += ' ';
      return newInput;

    default:
      newInput += button;
      return newInput;
  }
};
