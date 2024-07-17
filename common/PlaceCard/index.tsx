'use client';

import Image from 'next/image';
import React, { ReactNode } from 'react';
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
import { minusSign } from '../../public/main-screen';

import styles from './PlaceCard.module.scss';

interface IPlaceCardProps {
  place: IPlace;
  places?: (IPlace | Option)[];
  i?: number;
  isCountry?: boolean;
  placeFirstLetterChanged?: boolean;
  fromSideNav?: boolean;
  fromLeftSideNav?: boolean;
  withRegions?: boolean;
  selectedCountComponent?: ReactNode;
  fromRegionAccordion?: boolean;
}

const PlaceCard = ({
  place,
  isCountry,
  placeFirstLetterChanged,
  i,
  places,
  fromSideNav,
  fromLeftSideNav,
  withRegions,
  selectedCountComponent,
  fromRegionAccordion,
}: IPlaceCardProps) => {
  const dispatch = useAppDispatch();
  const pickedCountries = useAppSelector(selectPickedCountries);
  const isAttacking = useAppSelector(selectIsAttacking);
  const isSelected = pickedCountries.includes(place?.name) && !fromSideNav;
  const className = `${styles.placeCard}  ${
    selectedCountComponent ? styles.withCount : ''
  } ${fromSideNav ? styles.fromSideNav : ''} ${
    place?.regions ? styles.withRegions : ''
  } ${fromRegionAccordion ? styles.fromRegionAccordion : ''} ${
    isCountry ? styles.isCountry : ''
  } ${isSelected && fromLeftSideNav ? styles.selected : ''} ${
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
        {isSelected && fromLeftSideNav && isCountry && <GreenLineBorders />}
        {fromSideNav && (
          <button
            onClick={(event) => {
              event.stopPropagation();
              onClick();
            }}
          >
            <Image
              className={styles.minusSign}
              src={withRegions ? 'onboarding/arrow.svg' : minusSign}
              alt="minusSign"
              width={withRegions ? 11 : 40}
              height={withRegions ? 11 : 40}
              priority
            />
          </button>
        )}
        {selectedCountComponent}
      </button>
      {isCountry &&
        placeFirstLetterChanged &&
        places &&
        (Boolean(i) || i === 0) && (
          <AlphabetLetter letter={places[(i as number) + 1]?.name[0]} />
        )}
    </>
  );
};

export default PlaceCard;
