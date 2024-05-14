import AccordionWrapper from '../../common/AccordionWrapper';
import industry from '../../data/industryData';
import { setSelectedIndusties } from '../../redux/features/generalSlice';
import { useAppDispatch } from '../../redux/hooks';
import SearchInput, { ISearchInputProps } from '../SearchInput';

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
}: IIndustrySelectionProps) => {
  const dispatch = useAppDispatch();

  const onClick = (name: string, parent: string) => {
    dispatch(setSelectedIndusties({ name, parent }));
  };

  return (
    <>
      <SearchInput
        onChangeInput={onChangeInput}
        onSearchClick={onSearchClick}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />

      <div
        className={showKeyboard || searchInput ? styles.hideSelectionPanel : ''}
      >
        {industry.sectors.map((sector, index) => {
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
              <div>
                {sector.options.map((option, i) => (
                  <button
                    onClick={() => onClick(option.name, option.parent)}
                    className={styles.option}
                    key={i}
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            </AccordionWrapper>
          );
        })}
      </div>
    </>
  );
};

export default IndustrySelection;
