import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Image from 'next/image';
import PlaceCard from '../../common/PlaceCard';
import { Option } from '../../data/attackRegionsData';
import { COUNTRIES, NOT_FRIENDLY_COUNTRIES } from '../../constants';
import AlphabetLetter from '../../common/AlphabetLetter';

import styles from './Places.module.scss';

interface IPlacesProps {
  places: (IPlace | Option)[] | undefined;
  name?: string;
  fromSideNav?: boolean;
}

const Places = ({ places, name, fromSideNav }: IPlacesProps) => {
  const isCountry = name === COUNTRIES || name === NOT_FRIENDLY_COUNTRIES;

  if (places === undefined) {
    return null;
  }

  return (
    <div className={styles.places}>
      {(places as IPlace[]).map((place, i) => {
        const placeFirstLetterChanged =
          places[i].name[0] !== places[i + 1]?.name[0];

        if (place.regions && !fromSideNav) {
          return (
            <Accordion
              key={i}
              sx={() => ({
                backgroundColor: '#080808 !important',
                color: '#FFF',
                marginBottom: '10px',
              })}
            >
              <AccordionSummary
                key={place.code}
                aria-expanded
                expandIcon={
                  <Image
                    src={'onboarding/arrow.svg'}
                    alt={'arrow'}
                    width={24}
                    height={24}
                  />
                }
                sx={{ maxWidth: '566px' }}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                {i === 0 && (
                  <AlphabetLetter firstChild letter={place.name[0]} />
                )}
                <div className={styles.placesAccordionSummary}>
                  <PlaceCard isCountry place={place} />
                </div>
                {placeFirstLetterChanged && !fromSideNav && (
                  <AlphabetLetter letter={places[i + 1]?.name[0]} />
                )}
              </AccordionSummary>
              <AccordionDetails>
                {place.regions.map((region, i) => (
                  <PlaceCard key={i} place={region} />
                ))}
              </AccordionDetails>
            </Accordion>
          );
        }

        return (
          <PlaceCard
            fromSideNav={fromSideNav}
            i={i}
            places={places}
            placeFirstLetterChanged={placeFirstLetterChanged && !fromSideNav}
            isCountry={isCountry}
            key={i}
            place={place}
          />
        );
      })}
    </div>
  );
};

export default Places;
