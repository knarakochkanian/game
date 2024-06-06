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
