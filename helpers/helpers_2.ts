import { ConsequenceLevels } from '../components/LaunchConsequences';
import {
  closeEventIcon,
  closeEventIconProtect,
  closeIconActiveAttack,
  closeIconActiveProtect,
  plusIconActiveAttack,
  plusIconActiveProtect,
  plusIconNotActive,
  plusIconNotActiveProtect,
} from '../public/ui_kit';
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
  if (!consequence) return '';

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

export const copyFirstFourElements = (arr: INews[]) => {
  let result = [];

  for (let i = 0; i < 4; i++) {
    if (arr[i] !== undefined) {
      result.push(arr[i]);
    }
  }

  return result;
};

export const getModalCloseValue = (
  statusDataType: string | number | boolean | undefined
) => {
  switch (typeof statusDataType) {
    case 'string':
      return '';

    case 'number':
      return -1;

    case 'boolean':
      return false;
  }
};

export const proccessPlusOrCloseIconSrc = (
  eventModalIsOpen: boolean,
  isAttacking: boolean,
  eventIsSelected: boolean
) => {
  return eventModalIsOpen
    ? isAttacking
      ? eventIsSelected
        ? closeIconActiveAttack
        : closeEventIcon
      : eventIsSelected
      ? closeIconActiveProtect
      : closeEventIconProtect
    : isAttacking
    ? eventIsSelected
      ? plusIconActiveAttack
      : plusIconNotActive
    : eventIsSelected
    ? plusIconActiveProtect
    : plusIconNotActiveProtect;
};

export const capitalizeFirstLetter = (str: string) => {
  if(!str) return;
  if (str.length === 0) {
      return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
