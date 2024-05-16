import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Image from 'next/image';
import Places from '../Places';
import { useAppSelector } from '../../redux/hooks';
import { selectPickedCountriesObjects } from '../../redux/features/generalSlice';
import { pagesWhereDropdownDisabled } from '../../constants';
import useGetPage from '../../hooks/useGetPage';

import styles from './RegionAccordion.module.scss';

interface IRegionAccordionProps {
  delayed?: boolean | undefined;
}

const RegionAccordion = ({ delayed }: IRegionAccordionProps) => {
  const selectedCountries = useAppSelector(selectPickedCountriesObjects);
  const currentPage = useGetPage();
  const disable =
    pagesWhereDropdownDisabled.includes(String(currentPage)) ||
    selectedCountries.length === 0;

  return (
    <Accordion
      style={{ color: delayed ? '#0F0F0F' : 'none' }}
      defaultExpanded
      disabled={disable}
      sx={(theme) => ({
        backgroundColor: 'rgba(0, 0, 0, 0.87) !important',
        color: '#FFF',
        marginBottom: '10px',
      })}
    >
      <AccordionSummary
        expandIcon={
          <Image
            src={'onboarding/arrow.svg'}
            alt={'arrow'}
            width={24}
            height={24}
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
      <AccordionDetails>
        <Places fromSideNav name={'страны'} places={selectedCountries} />
      </AccordionDetails>
    </Accordion>
  );
};

export default RegionAccordion;
