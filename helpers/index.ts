import { complexCountriesNames } from '../components/Map/geodata/complex-countries';

import {
  getParentCountyNameByRegionName,
  getRegionsNamesByCountryName,
} from '../components/Map/utils/utils';
import countriesWithCodes from '../data/countriesWithCodes';
import emptySectors from '../data/emptySectors';
import { TSetCountryContourVisibility } from '../hooks/useManagePlaceClick';
import {
  IInitialState,
  addToPickedCountries,
  removeFromPickedCountries,
  setRegionsStatus,
} from '../redux/features/generalSlice';

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
  return actions?.find((action) => String(action.id) === actionId);
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

export function searchSectors(
  q: string, sectors: ISector[]
): ISector[] {
  if (q == null || q.length == 0) {
    return []
  }
  const query = q.toLocaleLowerCase()
  const result = Array<ISector>()

  sectors.forEach((s) => {

    const options = s.options.filter((option) => {
      return option.name.toLocaleLowerCase().includes(query)
    })

    if (options.length > 0) {
      result.push({
        ...s, options: options
      }
      )
    }
  })
  console.log("searchSectors.result", result)
  return result
}

export const addToPickedCountryObjects = (
  state: IInitialState,
  payload: string | string[]
) => {
  if (typeof payload === 'string') {
    const placeToBeAdded = state.places.find((country) => {
      return country?.name === payload;
      if (country.code) {
        return country?.name === payload;
      } else {
        const parentCountry = state.places.find(
          (place) => place.name === complexCountriesNames[0]
        );
        return parentCountry?.regions?.find(
          (region) => region.name === payload
        );
      }
    });

    if (!placeToBeAdded) {
      return;
    }

    placeToBeAdded.isSelected = true;

    if (placeToBeAdded.code) {
      const index = state.pickedCountriesObjects.findIndex(
        (country) => country?.name === placeToBeAdded?.name
      );

      if (index === -1) {
        state.pickedCountriesObjects = [
          ...state.pickedCountriesObjects,
          placeToBeAdded as IPlace,
        ];
      }
    }
  } else if (typeof payload === 'object') {
    const contriesToBeAdded = (payload as string[]).filter(
      (str) => !state.pickedCountriesObjects.some((obj) => obj.name === str)
    );

    const countryObjectsToAdd = state.places.map((place) => {
      if (contriesToBeAdded.includes(place.name)) {
        place.isSelected = true;
      }

      return place;
    });

    state.pickedCountriesObjects = [
      ...state.pickedCountriesObjects,
      ...countryObjectsToAdd,
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

export const getItemFromStorage = (item: string, window: Window & typeof globalThis) => {
  
  if (
    typeof window !== 'undefined' &&
    typeof window.localStorage.getItem(item) === 'string'
  ) {
    return JSON.parse(window.localStorage.getItem(item) as string);
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

export const manageRegionHighlighting = (
  setCountryContourVisibility: TSetCountryContourVisibility,
  pickedCountries: string[],
  dispatch: TDispatch,
  clickedPlaceName: string,
  handleTerritoryHighlighing: (name: string) => void
) => {
  const parentCountry = getParentCountyNameByRegionName(clickedPlaceName);
  if (!parentCountry) {
    return;
  }

  handleTerritoryHighlighing(clickedPlaceName);

  // определить, выделена ли сама страна
  if (!pickedCountries.includes(parentCountry)) {
    //выделить контуры регионов
    const regions = getRegionsNamesByCountryName(parentCountry);
    setCountryContourVisibility(regions, true);
    dispatch(setRegionsStatus({ parentCountry, bool: true }));
    dispatch(addToPickedCountries(parentCountry));
  } else {
    dispatch(setRegionsStatus({ parentCountry, bool: false }));
    dispatch(removeFromPickedCountries(parentCountry));
  }

  return;
};

export const extractNumber = (str: string) => Number(str.split('-')[1]);
