import { ConsequenceLevels } from '../components/LaunchConsequences';
import getIndustryNameInEnglish from './getIndustryNameInEnglish';
import { joinStrings } from './helpers_1';

export const proccessSelectedIndustries = (industrySectors: ISector[]) => {
  const selectedIndustries: {
    [key: string]: string;
  } = {};

  const selectedSectors = industrySectors.filter((s) =>
    s.options.some((o) => o.selected)
  );

  selectedSectors.forEach((sector) => {
    const sectorEnglishName = getIndustryNameInEnglish(sector.title);
    const targetSector = industrySectors.find((s) => s.title === sector.title);
    const selectedIndustryNames = targetSector?.options
      .filter((o) => o.selected)
      .map((o) => lowercaseFirstLetter(o.name));

    const selectedIndustryNamesJoint = selectedIndustryNames
      ? joinStrings(selectedIndustryNames)
      : '';

    selectedIndustries[sectorEnglishName as string] =
      selectedIndustryNamesJoint;
  });

  return selectedIndustries;
};

export const lowercaseFirstLetter = (input: string): string => {
  if (input.length === 0) {
    return input;
  }
  return input.charAt(0).toLowerCase() + input.slice(1);
};

export const proccessIndustryName = (industryName: string) => {
  switch (industryName) {
    case 'Amazon.com':
      return 'Amazon';
    case 'Exxon Mobil':
      return 'ExxonMobil';
    case 'McDonald’s':
      return 'McDonald';
    default:
      return industryName;
  }
};

export const proccessParagraphByDamageLevel = (
  damageLevel: string,
  consequence: ConsequenceLevels
) => {
    if(!consequence) return '';

  switch (damageLevel) {
    case 'Критический':
      return (consequence as ConsequenceLevels).critical;

    case 'Минимальный':
      return (consequence as ConsequenceLevels).minimal;

    case 'Предупреждение':
      return (consequence as ConsequenceLevels).warning;

    default:
      return '';
  }
};
