import attacks from '../data/attacks';

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

export const getAttack = (attackId: string): IAttack | undefined => {
  return attacks.find((attack) => attack.id === attackId);
};
