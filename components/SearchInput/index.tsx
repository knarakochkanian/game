import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputBase } from '@mui/material';
import { ChangeEvent } from 'react';
import { closeXButton } from '../../public/ui_kit';

import styles from './SearchInput.module.scss';

export interface ISearchInputProps {
  searchInput: string;
  onChangeInput: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onSearchClick: () => void;
  setSearchInput: TSetString;
}

const SearchInput = ({
  onChangeInput,
  onSearchClick,
  searchInput,
  setSearchInput,
}: ISearchInputProps) => {
  return (
    <div className={styles.searchInput}>
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          color: '#D9D9D9',
          fontSize: '34px',
          paddingLeft: '32px',
        }}
        placeholder="ПОИСК"
        value={searchInput}
        onChange={(e) => onChangeInput(e)}
        onClick={onSearchClick}
      />
      <IconButton
        type="button"
        sx={{ p: '10px', color: '#D9D9D9' }}
        aria-label="search"
      >
        {searchInput ? (
          <div
            role="button"
            className={styles.closeXButton}
            onClick={() => setSearchInput('')}
          >
            <Image
              src={closeXButton}
              alt="closeXButton"
              width={40}
              height={40}
              priority
            />
          </div>
        ) : (
          <SearchIcon
            sx={{ color: '#D9D9D9', width: '48px', height: '48px' }}
          />
        )}
      </IconButton>
    </div>
  );
};

export default SearchInput;
