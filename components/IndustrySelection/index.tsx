import AccordionWrapper from '../../common/AccordionWrapper';
import { searchSectors } from '../../helpers';
import { selectSectors } from '../../redux/features/generalSlice';
import {
  selectAllSectorsSelected,
  setAllSectorsSelected,
} from '../../redux/features/helpersSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
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
}: IIndustrySelectionProps) => {
  const dispatch = useAppDispatch();
  const industrySectors = useAppSelector(selectSectors);
  const allSectorsSelected = useAppSelector(selectAllSectorsSelected);

  const onSelectAll = () => {
    dispatch(setAllSectorsSelected());
  };

  const onSelectGroup = () => {};

  return (
    <>
      <SearchInput
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
                <SectorOptions sectorOptions={sector.options} />
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
          <button onClick={onSelectAll}>
            {allSectorsSelected ? 'сбросить все' : 'выбрать все'}
          </button>
        </header>

        {industrySectors?.map((sector, index) => {
          return (
            <AccordionWrapper
              styles={{
                accordionDetailsHeight: 'unset',
                accordionDetailsMaxHeight: '532px',
              }}
              expanded={expanded}
              handleExpansion={handleExpansion}
              data={sector}
              key={index}
            >
              <SectorOptions sectorOptions={sector.options} />
            </AccordionWrapper>
          );
        })}
      </div>
    </>
  );
};

export default IndustrySelection;
