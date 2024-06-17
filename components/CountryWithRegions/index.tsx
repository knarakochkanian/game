import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Image from 'next/image';
import PlaceCard from '../../common/PlaceCard';
import AlphabetLetter from '../../common/AlphabetLetter';
import { Option } from '../../data/attackRegionsData';
import { useAppSelector } from '../../redux/hooks';
import { selectPickedCountries } from '../../redux/features/generalSlice';

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
  const pickedCountries = useAppSelector(selectPickedCountries);

  return (
    <>
    <Accordion
      key={i}
      sx={{
        backgroundColor: '#080808 !important',
        color: '#FFF',
        marginBottom: '10px',
      }}
    >
      <AccordionSummary
        key={place.code}
        aria-expanded
        expandIcon={
          <Image
            src={'/onboarding/arrow.svg'}
            alt={'arrow'}
            width={24}
            height={24}
          />
        }
        sx={{ maxWidth: '566px' }}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        {i === 0 && !fromSideNav && (
          <AlphabetLetter firstChild letter={place.name[0]} />
        )}
        <div className={styles.placesAccordionSummary}>
          <PlaceCard fromSideNav={fromSideNav} isCountry place={place} />
        </div>        
      </AccordionSummary>
      <AccordionDetails>
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
