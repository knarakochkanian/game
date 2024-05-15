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
  const emptySectorsCopy = [...emptySectors];

  console.log('emptySectors', emptySectors);
  

  console.log('emptySectorsCopy', emptySectorsCopy);

  // industry.sectors.forEach((sector) => {
  //   sector.options.forEach((option) => {
  //     const optionFound = option.name
  //       .toLowerCase()
  //       .includes(searchText.toLowerCase());      

  //     if (optionFound) {
  //       const index = emptySectorsCopy.findIndex(
  //         (sec) => option.parent === sec.title
  //       );
  //       emptySectorsCopy[index]?.options.push(option);
  //     } else {
  //       const index = emptySectorsCopy.findIndex(
  //         (sec) => sector.title === sec.title
  //       );
  //       emptySectorsCopy[index].options.push(option);
  //     }
  //   });
  // });

  console.log('emptySectorsCopy', emptySectorsCopy);
  

  return emptySectorsCopy;
};
