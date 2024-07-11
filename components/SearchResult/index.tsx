import Image from 'next/image';
import { slashes_90_degree } from '../../public/main-screen';
import { ReactNode } from 'react';

import styles from './SearchResult.module.scss';

interface ISearchResultProps {
  showKeyboard: boolean;
  searchInput: string;
  children: ReactNode;
}

const SearchResult = ({ searchInput, showKeyboard, children }: ISearchResultProps) => {
  return (
    <dialog
      className={`${styles.searchResult} ${
        showKeyboard || searchInput ? '' : styles.displayNone
      } ${showKeyboard ? styles.keyboardOpened : ''}`}
    >
      <h5>результаты поиска</h5>
      <Image
        className={styles.slashes_90_degree}
        src={slashes_90_degree}
        alt="slashes_90_degree"
        width={12}
        height={70}
        priority
      />
      {children}
    </dialog>
  );
};

export default SearchResult;
