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
  actions: (IAttack | IProtection)[]
): IAttack | IProtection | undefined => {
  return actions.find((action) => action.id === actionId);
};

export const search = (searchText: string) => {
  if (!searchText) return;

  const foundPlaces = countriesWithCodes.filter((country) => {
    return country.name.toLowerCase().includes(searchText.toLowerCase());
  });

  return foundPlaces;
};

export function countSelectedOptions(sectors: ISector[], selected: string): number {
  return sectors.reduce((count, sector) => {
    // @ts-ignore
    return count + sector.options.filter(option => option[selected]).length;
  }, 0);
}

export const findFirstSectorWithSelectedOption = (sectors: ISector[]): number => {
  return sectors.findIndex(sector => 
    sector.options.some(option => option.selected)
  );
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
