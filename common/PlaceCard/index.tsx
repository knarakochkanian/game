'use client';
import Flag from 'react-world-flags';
import { useAppDispatch } from '../../redux/hooks';
import { setPlaceName } from '../../redux/features/generalSlice';

import styles from './PlaceCard.module.scss';

interface IPlaceCardProps {
  place: IPlace;
  isCountry?: boolean;
  placeFirstLetterChanged?: boolean;
}

const PlaceCard = ({ place, isCountry, placeFirstLetterChanged }: IPlaceCardProps) => {
  const dispatch = useAppDispatch();
  return (
    <>
      {isCountry && <div className={styles.alphabetLetter}></div>}
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
    </>
  );
};

export default PlaceCard;
