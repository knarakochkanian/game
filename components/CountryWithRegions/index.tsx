import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
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

import './AccordionStyles.scss';
import styles from './CountryWithRegions.module.scss';
interface ICountryWithRegionsProps {
  i: number;
  place: IPlace;
  places: (IPlace | Option)[];
  placeFirstLetterChanged: boolean;
  fromSideNav: boolean | undefined;
  fromLeftSideNav?: boolean;
}

const CountryWithRegions = ({
  fromSideNav,
  i,
  place,
  placeFirstLetterChanged,
  places,
  fromLeftSideNav,
}: ICountryWithRegionsProps) => {
  const isAttacking = useAppSelector(selectIsAttacking);
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);
  const pickedCountries = useAppSelector(selectPickedCountries);
  const [selectedCount, setSelectedCount] = useState(0);

  const handleAccordionChange = (
    event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setIsAccordionExpanded(isExpanded);
  };

  const selectedCountComponent = !isAccordionExpanded &&
    selectedCount !== 0 &&
    selectedCount !== place?.regions?.length && (
      <span
        className={`${styles.countSelected} ${
          isAttacking ? '' : styles.isProtecting
        }`}
      >
        {selectedCount}
        <GreenLineBorders width={4}/>
      </span>
    );

  return (
    <>
      {i === 0 && !fromSideNav && (
        <AlphabetLetter firstChild letter={place.name[0]} />
      )}
      <Accordion
        key={i}
        sx={{
          backgroundColor: '#080808 !important',
          color: '#FFF',
          marginBottom: '10px',
        }}
        expanded={isAccordionExpanded}
        onChange={handleAccordionChange}
      >
        <AccordionSummary
          key={place.code}
          aria-expanded={isAccordionExpanded}
          expandIcon={
            !fromSideNav && (
              <Image
                src={'/onboarding/arrow.svg'}
                alt={'arrow'}
                width={11}
                height={11}
              />
            )
          }
          sx={{ maxWidth: '566px' }}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <div className={styles.placesAccordionSummary}>
            <PlaceCard
              withRegions
              fromLeftSideNav={fromLeftSideNav}
              fromSideNav={fromSideNav}
              isCountry
              place={place}
              selectedCountComponent={selectedCountComponent}
            />
          </div>
        </AccordionSummary>
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
      {placeFirstLetterChanged && !fromSideNav && (
        <AlphabetLetter letter={places[i + 1]?.name[0]} />
      )}
    </>
  );
};

export default CountryWithRegions;
