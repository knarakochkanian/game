import countriesWithCodes from '../data/countriesWithCodes';
import emptySectors from '../data/emptySectors';
import { IInitialState } from '../redux/features/generalSlice';

export function formatNumber(str: string) {
  let reversed = str.split('').reverse().join('');
  let spaced = reversed.replace(/(\d{3})(?=\d)/g, '$1 ');

  return spaced.split('').reverse().join('');
}

export const truncateString = (inputString: string, maxLength: number) => {
  if (inputString.length <= maxLength) {
    return inputString;
  } else {
    return inputString.slice(0, maxLength - 3) + '...';
  }
};

export const getAction = (
  actionId: string,
  actions: IAction[]
): IAction | undefined => {
  return actions.find((action) => action.id === actionId);
};

export const search = (searchText: string) => {
  if (!searchText) return;

  const foundPlaces = countriesWithCodes.filter((country) => {
    return country.name.toLowerCase().includes(searchText.toLowerCase());
  });

  return foundPlaces;
};

export function countSelectedOptions(
  sectors: ISector[],
  selected: string
): number {
  return sectors.reduce((count, sector) => {
    // @ts-ignore
    return count + sector.options.filter((option) => option[selected]).length;
  }, 0);
}

export const findFirstSectorWithSelectedOption = (sectors: ISector[]) => {
  const sectorIndex = sectors.findIndex((sector) =>
    sector.options.some((option) => option.selected)
  );
  let firstSelectedOption;

  if (sectorIndex !== -1) {
    firstSelectedOption = sectors[sectorIndex].options.find(
      (option) => option.selected
    );
  }

  return {
    sectorIndex,
    firstSelectedOption,
  };
};

export const searchSectors = (
  searchText: string,
  industrySectors: ISector[]
) => {
  if (!searchText) return;

  const emptySectorsCopy: ISector[] = emptySectors.map((sector) => ({
    ...sector,
    options: [],
  }));

  industrySectors.forEach((sector) => {
    sector.options.forEach((option) => {
      if (
        option.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      ) {
        const targetSector = emptySectorsCopy.find(
          (s) => s.title === sector.title
        );
        if (targetSector) {
          targetSector.options.push(option);
        }
      }
    });
  });

  return emptySectorsCopy;
};

export const addToPickedCountryObjects = (
  state: IInitialState,
  payload: string
) => {
  const countryToBeAdded = state.places.find(
    (country) => country?.name === payload
  );

  if (!countryToBeAdded) return;

  countryToBeAdded.isSelected = true;

  const index = state.pickedCountriesObjects.findIndex(
    (country) => country?.name === countryToBeAdded?.name
  );

  if (index === -1) {
    state.pickedCountriesObjects = [
      ...state.pickedCountriesObjects,
      countryToBeAdded as IPlace,
    ];
  }
};

export const removeFromPickedCountryObjects = (
  state: IInitialState,
  payload: string
) => {
  const countryToBeRemoved = state.places.find(
    (country) => country?.name === payload
  );

  if (!countryToBeRemoved) return;

  countryToBeRemoved.isSelected = false;

  const index = state.pickedCountriesObjects.findIndex(
    (country) => country?.name === countryToBeRemoved?.name
  );

  if (index !== -1) {
    state.pickedCountriesObjects.splice(index, 1);
  }
};

export const getNextActionName = (name: string) => {
  const match = name.match(/#(\d+)-(\d+)/);

  if (!match) {
    throw new Error('Invalid format');
  }

  const [, left, right] = match;

  let leftNum = parseInt(left, 10);
  let rightNum = parseInt(right, 10);

  rightNum++;

  const rightLength = right.length;
  const maxRightValue = Math.pow(10, rightLength) - 1;

  if (rightNum > maxRightValue) {
    rightNum = 0;
    leftNum++;
  }

  const newLeft = String(leftNum).padStart(left.length, '0');
  const newRight = String(rightNum).padStart(right.length, '0');

  return `#${newLeft}-${newRight}`;
};

export const getItemFromStorage = (item: string) => {
  if (typeof localStorage.getItem(item) === 'string') {
    return JSON.parse(localStorage.getItem(item) as string);
  }
};

export const formatDate = (date: Date) => {
  // Pad function to ensure two digits for day, month, hours, and minutes
  const pad = (num: number) => String(num).padStart(2, '0');

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // Months are zero-indexed
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};
