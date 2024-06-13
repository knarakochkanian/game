import { RefObject } from 'react';
import Image from 'next/image';
import { IconButton, InputBase } from '@mui/material';
import { ChangeEvent } from 'react';
import { closeXButton } from '../../public/ui_kit';
import { useAppDispatch } from '../../redux/hooks';
import { setKeyboardInput } from '../../redux/features/helpersSlice';

import styles from './SearchInput.module.scss';

export interface ISearchInputProps {
  searchInput: string;
  onChangeInput: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onSearchClick: () => void;
  setSearchInput: TSetString;
  searchInputRef: RefObject<HTMLInputElement>;
}

const SearchInput = ({
  onChangeInput,
  onSearchClick,
  searchInput,
  setSearchInput,
  searchInputRef
}: ISearchInputProps) => {
  const dispatch = useAppDispatch();
  const onCleanSearch = () => {
    dispatch(setKeyboardInput(''));
    setSearchInput('')
  }
  
  return (
    <div className={styles.searchInput}>
      <InputBase
        inputRef={searchInputRef}
        sx={{
          ml: 1,
          flex: 1,
          color: '#D9D9D9',
          fontSize: '34px',
          paddingLeft: '32px',
        }}
        placeholder="Search"
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
            onClick={onCleanSearch}
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22 4.5C12.335 4.5 4.5 12.335 4.5 22C4.5 31.665 12.335 39.5 22 39.5C26.2925 39.5 30.224 37.9546 33.2685 35.3898L42 44.1214L44.1214 42L35.3898 33.2685C37.9546 30.224 39.5 26.2925 39.5 22C39.5 12.335 31.665 4.5 22 4.5ZM7.5 22C7.5 13.9919 13.9919 7.5 22 7.5C30.0081 7.5 36.5 13.9919 36.5 22C36.5 30.0081 30.0081 36.5 22 36.5C13.9919 36.5 7.5 30.0081 7.5 22Z"
              fill="#525252"
            />
          </svg>
        )}
      </IconButton>
    </div>
  );
};

export default SearchInput;
