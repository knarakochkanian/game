import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Image from 'next/image';
import Places from '../Places';
import { SUMMARY, pagesWhereDropdownDisabled } from '../../constants';
import useGetPage from '../../hooks/useGetPage';
import { defaultStyles, detailsStylesInSummery } from '../../data/styleObjects';
import { useAppSelector } from '../../redux/hooks';
import {
  removeFromPickedCountries,
  resetDamageLevel,
  resetPickedCountries,
  selectComfirmedFromOnboarding,
  selectPickedCountries,
} from '../../redux/features/generalSlice';

import styles from './RegionAccordion.module.scss';
import React, { useState } from 'react';
import { minusSign } from '../../public/main-screen';
import { useDispatch } from 'react-redux';

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
      style={{ color: delayed ? '#0F0F0F' : 'none', border: "1px solid rgba(82, 82, 82, 1)" }}
      defaultExpanded={false}
      disabled={disable}
      sx={(theme) => ({
        maxWidth: '313.67px',
        backgroundColor: 'rgba(0, 0, 0, 0.87) !important',
        color: '#FFF',
      })}
    >
      <AccordionSummary
        expandIcon={
          <Image
            style={{marginTop: '15px'}}
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
        <div className={styles.accordionSummary}>
          <h3>Регион</h3>
          <span>
            {selectedCountries.length === 0 ? '' : selectedCountries.length}
          </span>
        </div>
      </AccordionSummary>
      <AccordionDetails
        sx={currentPage === SUMMARY ? detailsStylesInSummery : defaultStyles}
      >
        {setWithOutFlag ? (
          <div className={styles.countiesWithOutFlag}>
            {counties.map((country) => (
              <div key={country}>
                {country}
                <button style={{display: 'none'}}  onClick={() => handleRemove(country)}>
                  <Image
                    className={styles.minusSign}
                    src={minusSign}
                    alt="minusSign"
                    width={20}
                    height={20}
                    priority
                  />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <Places fromSideNav name={'страны'} places={selectedCountries} />
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default RegionAccordion;
