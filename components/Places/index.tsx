import Image from 'next/image';
import { useRef, useState } from 'react';
import PlaceCard from '../../common/PlaceCard';
import { Option } from '../../data/attackRegionsData';
import { COUNTRIES, NOT_FRIENDLY_COUNTRIES } from '../../constants';
import AlphabetNav from '../AlphabetNav';
import { two_lines } from '../../public/ui_kit';
import useHighlightCurrentLetter from '../../hooks/useHighlightCurrentLetter';
import CountryWithRegions from '../CountryWithRegions';
import ResetOrSelectAll from '../../common/ResetOrSelectAll';

import styles from './Places.module.scss';

interface IPlacesProps {
  places: (IPlace | Option)[] | undefined;
  name?: string;
  fromSideNav?: boolean;
  fromLeftSideNav?: boolean;
}

const Places = ({
  places,
  name,
  fromSideNav,
  fromLeftSideNav,
}: IPlacesProps) => {
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

  const handleLetterClick = (letter: string) => {
    setClickedOnLetter(true);
    setTimeout(() => {
      setClickedOnLetter(false);
    }, 500);

    const element = countryRefs.current[letter];
    const container = containerRef.current;
    const offset = 60;

    if (element && container) {
      const elementPosition = element.getBoundingClientRect().top;
      const containerPosition = container.getBoundingClientRect().top;
      const scrollPosition =
        container.scrollTop + (elementPosition - containerPosition) - offset;

      container.scrollTo({ top: scrollPosition, behavior: 'smooth' });
      setCurrentLetter(letter);
    }
  };

  if (places === undefined) {
    return null;
  }

  return (
    <div className={styles.container}>
      {isCountry && (
        <Image
          className={styles.two_lines}
          src={two_lines}
          alt="two_lines"
          width={12}
          height={75}
          priority
        />
      )}

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
                    fromLeftSideNav={fromLeftSideNav}
                    fromSideNav={fromSideNav}
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
                    fromLeftSideNav={fromLeftSideNav}
                    fromSideNav={fromSideNav}
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

      {isCountry && fromLeftSideNav && (
        <AlphabetNav
          clickedOnLetter={clickedOnLetter}
          letters={letters}
          name={name}
          onLetterClick={handleLetterClick}
          currentLetter={currentLetter}
        />
      )}
    </div>
  );
};

export default Places;
