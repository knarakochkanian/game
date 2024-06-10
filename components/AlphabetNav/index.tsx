import { useRef } from 'react';
import useScrollToActiveLetter from '../../hooks/useScrollToActiveLetter';

import styles from './AlphabetNav.module.scss';

interface AlphabetNavProps {
  letters: string[];
  onLetterClick: (letter: string) => void;
  currentLetter: string;
  clickedOnLetter: boolean;
}

const AlphabetNav = ({
  letters,
  onLetterClick,
  clickedOnLetter,
  currentLetter,
}: AlphabetNavProps) => {
  const letterRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useScrollToActiveLetter(letterRefs, currentLetter, clickedOnLetter); 

  return (
    <div className={styles.alphabetNav}>
      {letters.map((letter) => (
        <div
          key={letter}
          ref={(el) => {
            letterRefs.current[letter] = el;
          }}
          className={`${styles.letter} ${
            currentLetter === letter ? styles.active : ''
          }`}
          onClick={() => onLetterClick(letter)}
        >
          {letter}
          <span></span>
        </div>
      ))}      
    </div>
  );
};

export default AlphabetNav;
