import styles from './AlphabetLetter.module.scss';

const AlphabetLetter = ({ letter }: { letter: string }) => {
  return <div className={styles.alphabetLetter}>{letter}</div>;
};

export default AlphabetLetter;
