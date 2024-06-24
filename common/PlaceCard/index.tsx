'use client';

import Flag from 'react-world-flags';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectIsAttacking,
  selectPickedCountries,
  setPlaceName,
} from '../../redux/features/generalSlice';
import AlphabetLetter from '../AlphabetLetter';
import { Option } from '../../data/attackRegionsData';
import GreenLineBorders from '../GreenLineBorders';

import styles from './PlaceCard.module.scss';
import Image from 'next/image';
import { minusSign } from '../../public/main-screen';
import React from 'react';

interface IPlaceCardProps {
  place: IPlace;
  places?: (IPlace | Option)[];
  i?: number;
  isCountry?: boolean;
  placeFirstLetterChanged?: boolean;
  fromSideNav?: boolean;
  withRegions?: boolean;
}

const PlaceCard = ({
  place,
  isCountry,
  placeFirstLetterChanged,
  i,
  places,
  fromSideNav,
  withRegions,
}: IPlaceCardProps) => {
  const dispatch = useAppDispatch();
  const pickedCountries = useAppSelector(selectPickedCountries);
  const isAttacking = useAppSelector(selectIsAttacking);
  const isSelected = pickedCountries.includes(place?.name) && !fromSideNav;
  const className = `${styles.placeCard} ${fromSideNav ? styles.fromSideNav : ''} ${
    place?.regions ? styles.withRegions : ''
  } ${isSelected ? styles.selected : ''} ${
    !isAttacking ? styles.isProtecting : ''
  }`;

  const onClick = () => {
    if (withRegions) return;
    console.log('Button clicked:', place?.name);
    dispatch(setPlaceName(place?.name));
  };

  return (
    <>
      {i === 0 && isCountry && !fromSideNav && (
        <AlphabetLetter firstChild letter={place?.name[0]} />
      )}

      <button onClick={onClick} className={className}>
        {!fromSideNav && place?.code && (
          <div className={styles.flagContainer}>
            <Flag code={place?.code} height={20} width={20} />
          </div>
        )}
        <h4>{place?.name}</h4>
        {isSelected && place?.regions && <GreenLineBorders />}
        {fromSideNav && (
          <button onClick={onClick}>
            <Image
              className={styles.minusSign}
              src={minusSign}
              alt="minusSign"
              width={40}
              height={40}
              priority
            />
          </button>
        )}
      </button>
      {isCountry && placeFirstLetterChanged && places && i && (
        <AlphabetLetter letter={places[i + 1]?.name[0]} />
      )}
    </>
  );
};

export default PlaceCard;
