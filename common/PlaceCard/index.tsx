'use client';
import Flag from 'react-world-flags';
import { useAppDispatch } from '../../redux/hooks';
import { setPlaceName } from '../../redux/features/generalSlice';
import AlphabetLetter from '../AlphabetLetter';
import { Option } from '../../data/attackRegionsData';

import styles from './PlaceCard.module.scss';

interface IPlaceCardProps {
  place: IPlace;
  places?: (IPlace | Option)[];
  i?: number;
  isCountry?: boolean;
  placeFirstLetterChanged?: boolean;
}

const PlaceCard = ({
  place,
  isCountry,
  placeFirstLetterChanged,
  i,
  places,
}: IPlaceCardProps) => {
  const dispatch = useAppDispatch();
  return (
    <>
      {i === 0 && isCountry && (
        <AlphabetLetter firstChild letter={place.name[0]} />
      )}

      <button
        onClick={() => {
          console.log('Button clicked:', place.name);
          dispatch(setPlaceName(place.name));
        }}
        className={`${styles.placeCard} ${
          place.regions ? styles.withRegions : ''
        }`}
      >
        {place.code && (
          <div className={styles.flagContainer}>
            <Flag code={place.code} height={40} width={40} />
          </div>
        )}

        <h4>{place.name}</h4>
      </button>

      {isCountry && placeFirstLetterChanged && places && i && (
        <AlphabetLetter letter={places[i + 1]?.name[0]} />
      )}
    </>
  );
};

export default PlaceCard;
