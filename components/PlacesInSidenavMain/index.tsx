import { useRef, useState } from 'react';
import PlaceCard from '../../common/PlaceCard';
import { Option } from '../../data/attackRegionsData';
import { COUNTRIES, NOT_FRIENDLY_COUNTRIES } from '../../constants';
import useHighlightCurrentLetter from '../../hooks/useHighlightCurrentLetter';
import CountryWithRegions from '../CountryWithRegions';
import ResetOrSelectAll from '../../common/ResetOrSelectAll';

import styles from './PlacesInSidenavMain.module.scss';

interface IPlacesProps {
  places: (IPlace | Option)[] | undefined;
  name?: string;
  fromSideNav?: boolean;
}

const PlacesInSidenavMain = ({ places, name, fromSideNav }: IPlacesProps) => {
  const letters = Array.from(
    new Set(places?.map((place) => place.name[0].toUpperCase()))
  );
  const isCountry = name === COUNTRIES || name === NOT_FRIENDLY_COUNTRIES;
  const [currentLetter, setCurrentLetter] = useState<string>(letters[0]);
  const countryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the scrollable container
  const [clickedOnLetter, setClickedOnLetter] = useState(false);

  useHighlightCurrentLetter(
    isCountry,
    letters,
    currentLetter,
    setCurrentLetter,
    containerRef,
    countryRefs
  );

  if (places === undefined) {
    return null;
  }

  return (
    <div className={styles.container}>
      {name === NOT_FRIENDLY_COUNTRIES && <ResetOrSelectAll places={places} />}

      <div
        className={`${styles.places} ${
          name === COUNTRIES ? styles.fromCountries : ''
        }`}
        ref={containerRef}
      >
        {(places as IPlace[]).map((place, i) => {
          const placeFirstLetterChanged =
            places[i]?.name[0] !== places[i + 1]?.name[0];
          const firstLetter = place.name[0].toUpperCase();

          if (!countryRefs.current[firstLetter]) {
            countryRefs.current[firstLetter] = null;
          }

          return (
            <div
              key={place.id}
              ref={(el) => {
                if (!countryRefs.current[firstLetter]) {
                  countryRefs.current[firstLetter] = el;
                }
              }}
            >
              {place?.regions ? (
                <>
                  {i === 0 && <div id={firstLetter} />}
                  <CountryWithRegions
                    fromSideNav={true}
                    i={i}
                    place={place}
                    placeFirstLetterChanged={placeFirstLetterChanged}
                    places={places}
                  />
                </>
              ) : (
                <>
                  {i === 0 && <div id={firstLetter} />}
                  <PlaceCard
                    fromSideNav={true}
                    i={i}
                    places={places}
                    placeFirstLetterChanged={
                      placeFirstLetterChanged && !fromSideNav
                    }
                    isCountry={isCountry}
                    key={i}
                    place={place}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlacesInSidenavMain;
