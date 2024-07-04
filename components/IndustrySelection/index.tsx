import { RESET, SELECT_ALL } from '../../constants';
import { searchSectors } from '../../helpers';
import {
  processAllIndustries,
  selectSectors,
} from '../../redux/features/generalSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import IndustrySector from '../IndustrySector';
import SearchInput, { ISearchInputProps } from '../SearchInput';
import SearchResult from '../SearchResult';
import SectorOptions from '../SectorOptions';

import styles from './IndustrySelection.module.scss';

interface IIndustrySelectionProps extends ISearchInputProps {
  showKeyboard: boolean;
  expanded: number;
  handleExpansion: (panel: any) => (event: any, isExpanded: any) => void;
}

const IndustrySelection = ({
  onChangeInput,
  onSearchClick,
  searchInput,
  setSearchInput,
  showKeyboard,
  expanded,
  handleExpansion,
  searchInputRef,
  setCursorPosition,
  setInput,
}: IIndustrySelectionProps) => {
  const dispatch = useAppDispatch();
  const industrySectors = useAppSelector(selectSectors);
  const showReset = industrySectors.some((i) =>
    i.options.some((option) => option.selected)
  );

  const onResetOrSelectAll = () => {
    if (showReset) {
      dispatch(processAllIndustries(RESET));
    } else {
      dispatch(processAllIndustries(SELECT_ALL));
    }
  };

  return (
    <>
      <SearchInput
        setCursorPosition={setCursorPosition}
        setInput={setInput}
        searchInputRef={searchInputRef}
        onChangeInput={onChangeInput}
        onSearchClick={onSearchClick}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />

      <SearchResult searchInput={searchInput} showKeyboard={showKeyboard}>
        {searchSectors(searchInput, industrySectors)?.map(
          (sector, i) =>
            sector.options[0] && (
              <>
                <h4 className={styles.sectorTitle}>{sector.title}</h4>
                <SectorOptions fromLeftSideNav sectorOptions={sector.options} />
              </>
            )
        )}
      </SearchResult>

      <div
        className={`${styles.sectorsCtn} ${
          showKeyboard || searchInput ? styles.hideSelectionPanel : ''
        }`}
      >
        <header className={styles.industryHeader}>
          <h2>отрасли</h2>
          <div>
            <button onClick={onResetOrSelectAll}>
              {showReset ? 'сбросить все' : 'выбрать все'}
            </button>
          </div>
        </header>

        <div className={styles.industrySectors}>
          {industrySectors?.map((sector, index) => (
            <IndustrySector
              expanded={expanded}
              handleExpansion={handleExpansion}
              sector={sector}
              key={index}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default IndustrySelection;
