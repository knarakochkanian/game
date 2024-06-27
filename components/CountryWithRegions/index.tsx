import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import PlaceCard from '../../common/PlaceCard';
import AlphabetLetter from '../../common/AlphabetLetter';
import { Option } from '../../data/attackRegionsData';
import { useAppSelector } from '../../redux/hooks';
import { selectPickedCountries } from '../../redux/features/generalSlice';
import ResetOrSelectAll from '../../common/ResetOrSelectAll';

import './AccordionStyles.scss';
import styles from './CountryWithRegions.module.scss';

interface ICountryWithRegionsProps {
  i: number;
  place: IPlace;
  places: (IPlace | Option)[];
  placeFirstLetterChanged: boolean;
  fromSideNav: boolean | undefined;
}

const CountryWithRegions = ({
  fromSideNav,
  i,
  place,
  placeFirstLetterChanged,
  places,
}: ICountryWithRegionsProps) => {
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);
  const pickedCountries = useAppSelector(selectPickedCountries);
  const [selectedCount, setSelectedCount] = useState(0);

  const handleAccordionChange = (
    event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setIsAccordionExpanded(isExpanded);
  };

  return (
    <>
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
          {i === 0 && !fromSideNav && (
            <AlphabetLetter firstChild letter={place.name[0]} />
          )}
          <div className={styles.placesAccordionSummary}>
            <PlaceCard
              withRegions
              fromSideNav={fromSideNav}
              isCountry
              place={place}
            />
            {!isAccordionExpanded &&
              selectedCount !== 0 &&
              selectedCount !== place?.regions?.length && (
                <span className={styles.countSelected}>{selectedCount}</span>
              )}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <ResetOrSelectAll
            setSelectedCount={setSelectedCount}
            places={place?.regions}
            withCount
          />

          {place?.regions?.map((region, i) =>
            fromSideNav ? (
              pickedCountries.includes(region.name) && (
                <PlaceCard fromSideNav={fromSideNav} key={i} place={region} />
              )
            ) : (
              <PlaceCard fromSideNav={fromSideNav} key={i} place={region} />
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
