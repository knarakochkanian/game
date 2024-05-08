import Flag from 'react-world-flags';

import styles from './PlaceCard.module.scss';

const PlaceCard = ({ place }: { place: IPlace }) => {
  return (
    <article className={styles.placeCard}>
        <div className={styles.flagContainer}>
           <Flag code={'051'} height={40} width={40} /> 
        </div>
      
      <h4>{place.name}</h4>
    </article>
  );
};

export default PlaceCard;
