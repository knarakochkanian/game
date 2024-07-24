import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import PlaceCard from '../../common/PlaceCard';
import AlphabetLetter from '../../common/AlphabetLetter';
import { Option } from '../../data/attackRegionsData';
import { useAppSelector } from '../../redux/hooks';
import {
  selectIsAttacking,
  selectPickedCountries,
} from '../../redux/features/generalSlice';
import ResetOrSelectAll from '../../common/ResetOrSelectAll';
import GreenLineBorders from '../../common/GreenLineBorders';
import { countMatchingStrings } from '../../helpers/helpers_1';

import './AccordionStyles.scss';
import styles from './CountryWithRegions.module.scss';
interface ICountryWithRegionsProps {
  i: number;
  place: IPlace;
  places: (IPlace | Option)[];
  placeFirstLetterChanged: boolean;
  fromSideNav: boolean | undefined;
  fromLeftSideNav?: boolean;
  fromSearchResult?: boolean;
  fromRegionAccordion?: boolean;
}

const CountryWithRegions = ({
  fromSideNav,
  i,
  place,
  placeFirstLetterChanged,
  places,
  fromLeftSideNav,
  fromSearchResult,
  fromRegionAccordion,
}: ICountryWithRegionsProps) => {
  const isAttacking = useAppSelector(selectIsAttacking);
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);
  const pickedCountries = useAppSelector(selectPickedCountries);
  const [selectedCount, setSelectedCount] = useState(0);
  const notAllRegionsSelected = selectedCount !== place?.regions?.length;
  const regionNames = place.regions?.map((r) => r.name) as string[];

  useEffect(() => {
    const selectedRegions = countMatchingStrings(regionNames, pickedCountries);
    console.log('selectedCount', selectedCount);

    setSelectedCount(selectedRegions);
  }, [JSON.stringify(pickedCountries)]);

  const handleAccordionChange = (
    event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setIsAccordionExpanded(isExpanded);
  };

  const selectedCountComponent = !isAccordionExpanded &&
    selectedCount !== 0 &&
    notAllRegionsSelected && !fromSideNav && (
      <span
        className={`${styles.countSelected} ${
          isAttacking ? '' : styles.isProtecting
        }`}
      >
        {selectedCount}
        <GreenLineBorders width={4} />
      </span>
    );

  return (
    <>
      {i === 0 && !fromSideNav && (
        <AlphabetLetter firstChild letter={place.name[0]} />
      )}
      <div
        className={`${
          fromLeftSideNav && !fromSearchResult ? styles.withRegionsFormLeft : ''
        }`}
      >
        <Accordion
          key={i}
          sx={{
            backgroundColor: 'transparent !important',
            color: '#FFF',
            padding: '1px 0',
            boxShadow: 'unset',
          }}
          expanded={
            fromSideNav
              ? !notAllRegionsSelected
                ? false
                : true
              : isAccordionExpanded
          }
          onChange={handleAccordionChange}
        >
          <AccordionSummary
            key={place.code}
            aria-expanded={isAccordionExpanded}
            expandIcon={
              fromSideNav ? undefined : (
                <Image
                  src={'/onboarding/arrow.svg'}
                  alt={'arrow'}
                  width={11}
                  height={11}
                />
              )
            }
            sx={{
              maxWidth: '566px',
              paddingLeft: fromSearchResult ? '20px' : '0',
              paddingRight: '16px',
              minHeight: '54px !important',
            }}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <div className={styles.placesAccordionSummary}>
              <PlaceCard
                allRegionsSelected={!notAllRegionsSelected}
                fromRegionAccordion={fromRegionAccordion}
                withRegions
                fromLeftSideNav={fromLeftSideNav}
                fromSideNav={fromSideNav}
                isCountry
                place={place}
                selectedCountComponent={selectedCountComponent}
              />
            </div>
          </AccordionSummary>

          <p className={styles.regionsCount}>Регион {selectedCount}</p>

          <AccordionDetails>
            {fromLeftSideNav && (
              <ResetOrSelectAll
                setSelectedCount={setSelectedCount}
                places={place?.regions}
                withCount
              />
            )}

            {place?.regions?.map((region, i) =>
              fromSideNav ? (
                pickedCountries.includes(region.name) && (
                  <PlaceCard
                    fromLeftSideNav={fromLeftSideNav}
                    fromSideNav={fromSideNav}
                    isRegion
                    key={i}
                    place={region}
                  />
                )
              ) : (
                <PlaceCard
                  fromLeftSideNav={fromLeftSideNav}
                  fromSideNav={fromSideNav}
                  key={i}
                  place={region}
                />
              )
            )}
          </AccordionDetails>
        </Accordion>
      </div>

      {placeFirstLetterChanged && !fromSideNav && (
        <AlphabetLetter letter={places[i + 1]?.name[0]} />
      )}
    </>
  );
};

export default CountryWithRegions;
