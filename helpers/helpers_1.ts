import dayjs from 'dayjs';
import {
  BACKSPACE_NAME,
  ENGLISH,
  RESET,
  RUSSIAN,
  SELECT_ALL,
  SHIFT_NAME,
  SPACE_NAME,
} from '../constants';
import englishLayout from '../data/keyboardData/englishLayout';
import russianLayout from '../data/keyboardData/russianLayout';
import { formatDate } from '.';
import { IInitialState } from '../redux/features/generalSlice';

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

export const proccessNewInput = (
  button: string,
  input: string,
  cursorPosition: number
) => {
  let newInput = input;
  switch (button) {
    case BACKSPACE_NAME:
      if (cursorPosition > 0) {
        newInput =
          newInput.slice(0, cursorPosition - 1) +
          newInput.slice(cursorPosition);
      }
      break;

    case SHIFT_NAME:
      break;

    case SPACE_NAME:
      newInput =
        newInput.slice(0, cursorPosition) +
        ' ' +
        newInput.slice(cursorPosition);
      break;

    default:
      newInput =
        newInput.slice(0, cursorPosition) +
        button +
        newInput.slice(cursorPosition);
      break;
  }
  return newInput;
};

export const getDelayedDateWithTime = (
  delayedDate: dayjs.Dayjs | null,
  delayedTime: string | null
) => {
  let delayedDateProccessed = null;
  if (delayedDate) {
    delayedDateProccessed = formatDate(delayedDate?.toDate());
  }

  return `${delayedDateProccessed?.split(' ')[0]} ${delayedTime || '00:00'}`;
};

export const countMatchingStrings = (arr1: string[], arr2: string[]) => {
  return arr1.filter((str) => arr2.includes(str)).length;
};

export const getRegionNames = (
  complexCountries: string[],
  state: IInitialState,
  action: string
) => {
  let regions: string[] = [];

  complexCountries.forEach((country: string) => {
    const foundCountry = state.places.find((place) => (place.name === country));

    if (foundCountry) {
      foundCountry.regions?.forEach((region) => {
        switch (action) {
          case RESET:
            region.isSelected = false;
            break;
          case SELECT_ALL:
            region.isSelected = true;
            break;
        }
      });

      const regionNames = (foundCountry as IPlace).regions?.map(
        (region) => region.name
      );

      regions = [...regions, ...(regionNames as string[])];
    }
  });

  return regions;
};
