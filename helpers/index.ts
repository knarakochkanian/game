import countriesWithCodes from '../data/countriesWithCodes';
import emptySectors from '../data/emptySectors';
import industry from '../data/industryData';

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

export const searchSectors = (searchText: string) => {
  if (!searchText) return;

  const emptySectorsCopy: ISector[] = emptySectors.map((sector) => ({
    ...sector,
    options: [],
  }));


  industry.sectors.forEach((sector) => {
    sector.options.forEach((option) => {
      if (option.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())) {
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
