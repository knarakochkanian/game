import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Image from 'next/image';
import AccordionWrapper from '../../common/AccordionWrapper';
import SectorOptions from '../SectorOptions';
import { countSelectedOptions } from '../../helpers';
import React, { useState } from 'react';
import useDefaultExpandedSector from '../../hooks/useDefaultExpandedSector';
import { arrowDown, arrowDownGray } from '../../public/summary';
import { SUMMARY, pagesWhereDropdownDisabled } from '../../constants';
import useGetPage from '../../hooks/useGetPage';
import {
  card,
  defaultStyles,
  detailsStylesInSummery,
} from '../../data/styleObjects';
import { useAppSelector } from '../../redux/hooks';
import {
  selectComfirmedFromOnboarding,
  selectIsAttacking,
} from '../../redux/features/generalSlice';
import { minusSign } from '../../public/main-screen';

import styles from './IndustryAccordion.module.scss';

interface IIndustryAccordionProps {
  delayed?: boolean | undefined;
  industrySectors: ISector[];
  fromSideNav?: boolean;
}

const IndustryAccordion = ({
  delayed,
  industrySectors,
  fromSideNav,
}: IIndustryAccordionProps) => {
  const currentPage = useGetPage();
  const fromOnboarding = useAppSelector(selectComfirmedFromOnboarding);
  const numberOfSelectedSectors =
    countSelectedOptions(industrySectors, 'selected') !== 0
      ? countSelectedOptions(industrySectors, 'selected')
      : null;
  const isAttacking = useAppSelector(selectIsAttacking);

  const [expanded, setExpanded] = useState(industrySectors[0].id);

  // @ts-ignore
  const handleExpansion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const disable =
    pagesWhereDropdownDisabled.includes(String(currentPage)) ||
    numberOfSelectedSectors === null ||
    fromOnboarding;

  useDefaultExpandedSector(industrySectors, setExpanded);

  return (
    <Accordion
      disabled={disable}
      style={{ color: delayed ? '#0F0F0F' : 'none', border: 'none' }}
      sx={(theme) => ({
        border: '1px solid rgba(82, 82, 82, 1)',
        backgroundColor: 'rgba(0, 0, 0, 0.87) !important',
        color: '#FFF',
        marginBottom: '10px',
        maxWidth: '314.33px',
      })}
    >
      <AccordionSummary
        expandIcon={
          <Image
            style={{ marginTop: '15px' }}
            src={numberOfSelectedSectors === null ? arrowDownGray : arrowDown}
            alt={'arrow'}
            width={11}
            height={11}
          />
        }
        sx={{
          display: delayed ? 'none' : 'flex',
          opacity: '1 !important',
        }}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        <div
          className={`
        ${
          fromSideNav && numberOfSelectedSectors
            ? styles.accordionSummaryLine
            : styles.accordionSummaryLineDisable
        }
         ${styles.accordionSummary} ${isAttacking ? '' : styles.isProtecting}
  `}
        >
          <h3>Отрасль</h3>
          <span>{numberOfSelectedSectors}</span>
        </div>
      </AccordionSummary>
      <AccordionDetails
        sx={currentPage === SUMMARY ? detailsStylesInSummery : defaultStyles}
      >
        {industrySectors?.map((sector, index) => {
          const selectedOptionsLength = sector.options.filter(
            (option) => option.selected
          ).length;

          if (selectedOptionsLength === 0) return;

          return (
            <AccordionWrapper
              styles={{
                accordionDetailsHeight: 'unset',
                accordionDetailsMaxHeight: '532px',
                accordionBackground: card,
              }}
              expanded={expanded}
              handleExpansion={handleExpansion}
              data={sector}
              key={index}
            >
              <SectorOptions fromSideNav sectorOptions={sector.options} />
            </AccordionWrapper>
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
};

export default IndustryAccordion;
