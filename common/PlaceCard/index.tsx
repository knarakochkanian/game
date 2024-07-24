'use client';

import Image from 'next/image';
import React, { ReactNode } from 'react';
import Flag from 'react-world-flags';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectActiveBlocks,
  selectIsAttacking,
  selectPickedCountries,
  setActiveBlocks,
  setPlaceName,
} from '../../redux/features/generalSlice';
import AlphabetLetter from '../AlphabetLetter';
import { Option } from '../../data/attackRegionsData';
import GreenLineBorders from '../GreenLineBorders';
import { minusSign } from '../../public/main-screen';
import { RESET } from '../../constants';

import styles from './PlaceCard.module.scss';

interface IPlaceCardProps {
  place: IPlace;
  places?: (IPlace | Option)[];
  i?: number;
  isCountry?: boolean;
  isRegion?: boolean;
  placeFirstLetterChanged?: boolean;
  fromSideNav?: boolean;
  fromLeftSideNav?: boolean;
  withRegions?: boolean;
  selectedCountComponent?: ReactNode;
  fromRegionAccordion?: boolean;
  allRegionsSelected?: boolean;
}

const PlaceCard = ({
  place,
  isCountry,
  isRegion,
  placeFirstLetterChanged,
  i,
  places,
  fromSideNav,
  fromLeftSideNav,
  withRegions,
  selectedCountComponent,
  fromRegionAccordion,
  allRegionsSelected,
}: IPlaceCardProps) => {
  const dispatch = useAppDispatch();
  const activeBlocks = useAppSelector(selectActiveBlocks);
  const pickedCountries = useAppSelector(selectPickedCountries);
  const isAttacking = useAppSelector(selectIsAttacking);
  const isSelected = pickedCountries.includes(place?.name) && !fromSideNav;
  const className = `${styles.placeCard} ${isRegion ? styles.isRegion : ''}  ${
    selectedCountComponent ? styles.withCount : ''
  } ${fromSideNav ? styles.fromSideNav : ''} ${
    place?.regions ? styles.withRegions : ''
  } ${fromRegionAccordion ? styles.fromRegionAccordion : ''} ${
    isCountry ? styles.isCountry : ''
  } ${isSelected && fromLeftSideNav ? styles.selected : ''} ${
    !isAttacking ? styles.isProtecting : ''
  }`;

  const onClick = (clickedOnMinus?: boolean) => {
    if (withRegions && !fromSideNav) return;
    if (!clickedOnMinus && fromSideNav) {
      return;
    }

    if (withRegions) {
      const members = place.regions?.map((r) => r.name);
      dispatch(setPlaceName({ members, action: RESET }));
      dispatch(setActiveBlocks(place.name.toUpperCase()));
    } else {
      console.log('Button clicked:', place?.name);
      dispatch(setPlaceName(place?.name));

      if (place.name === 'Беларусь') {
        dispatch(setActiveBlocks('БЕЛОРУССИЯ'));
      }
    }
  };

  return (
    <>
      {i === 0 && isCountry && !fromSideNav && (
        <AlphabetLetter firstChild letter={place?.name[0]} />
      )}

      <button onClick={() => onClick()} className={className}>
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
              onClick(true);
            }}
          >
            <Image
              className={styles.minusSign}
              src={
                withRegions && !allRegionsSelected && !fromSideNav
                  ? 'onboarding/arrow.svg'
                  : minusSign
              }
              alt="minusSign"
              width={11}
              height={11}
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
