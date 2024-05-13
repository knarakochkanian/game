import styles from './AlphabetLetter.module.scss';

const AlphabetLetter = ({
  letter,
  firstChild,
}: {
  letter: string;
  firstChild?: boolean;
}) => {
  return (
    <div
      className={`${styles.alphabetLetter} ${
        firstChild ? styles.firstChild : ''
      }`}
    >
      {letter}
    </div>
  );
};

export default AlphabetLetter;
