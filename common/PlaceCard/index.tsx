'use client';
import Flag from 'react-world-flags';

import styles from './PlaceCard.module.scss';
import { useAppDispatch } from '../../redux/hooks';
import { setPlaceName } from '../../redux/features/generalSlice';

const PlaceCard = ({ place }: { place: IPlace }) => {
  const dispatch = useAppDispatch();
  return (
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
  );
};

export default PlaceCard;
