import Image from 'next/image';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Places from '../Places';
import {
  pagesWhereAccordionIsLikeInSummary,
  pagesWhereDropdownDisabled,
} from '../../constants';
import useGetPage from '../../hooks/useGetPage';
import { defaultStyles, detailsStylesInSummery } from '../../data/styleObjects';
import { useAppSelector } from '../../redux/hooks';
import {
  removeFromPickedCountries,
  resetDamageLevel,
  resetPickedCountries,
  selectComfirmedFromOnboarding,
  selectIsAttacking,
  selectPickedCountries,
} from '../../redux/features/generalSlice';
import PlacesInSidenavMain from '../PlacesInSidenavMain';
import { minusSign } from '../../public/main-screen';

import styles from './RegionAccordion.module.scss';

interface IRegionAccordionProps {
  delayed?: boolean | undefined;
  selectedCountries: IPlace[];
  setWithOutFlag?: boolean;
}

const RegionAccordion = ({
  delayed,
  selectedCountries,
  setWithOutFlag,
}: IRegionAccordionProps) => {
  const currentPage = useGetPage();
  const fromOnboarding = useAppSelector(selectComfirmedFromOnboarding);
  const counties = useAppSelector(selectPickedCountries);
  const isAttacking = useAppSelector(selectIsAttacking);
  const dispatch = useDispatch();
  const handleRemove = (countryName: string) => {
    dispatch(removeFromPickedCountries(countryName));
  };
  const disable =
    pagesWhereDropdownDisabled.includes(String(currentPage)) ||
    selectedCountries.length === 0 ||
    fromOnboarding;

  return (
    <Accordion
      style={{ color: delayed ? '#0F0F0F' : 'none' }}
      defaultExpanded={false}
      disabled={disable}
      sx={(theme) => ({
        backgroundColor: 'rgba(0, 0, 0, 0.87) !important',
        color: '#FFF',
        marginBottom: '10px',
        maxWidth: '314.33px',
      })}
    >
      <AccordionSummary
        expandIcon={
          <Image
            src={'onboarding/arrow.svg'}
            alt={'arrow'}
            width={11}
            height={11}
          />
        }
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{
          display: delayed ? 'none' : 'flex',
          alignItems: 'center',
        }}
      >
        <div
          className={`${
            setWithOutFlag && selectedCountries.length !== 0
              ? styles.accordionWiOutFlag
              : ''
          } ${
            setWithOutFlag && selectedCountries.length === 0
              ? styles.accordionWiOutFlagDisable
              : ''
          }
              ${styles.accordionSummary} ${
            isAttacking ? '' : styles.isProtecting
          }
          `}
        >
          <h3>Регион</h3>
          <span>
            {selectedCountries.length === 0 ? '' : selectedCountries.length}
          </span>
        </div>
      </AccordionSummary>
      <AccordionDetails
        sx={
          pagesWhereAccordionIsLikeInSummary.includes(
            currentPage || 'undefined'
          )
            ? detailsStylesInSummery
            : defaultStyles
        }
      >
        {setWithOutFlag ? (
          <PlacesInSidenavMain places={selectedCountries} />
        ) : (
          <Places fromRegionAccordion  name={'страны'} places={selectedCountries} />
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default RegionAccordion;
