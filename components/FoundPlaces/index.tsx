import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Theme,
} from '@mui/material';
import Image from 'next/image';
import PlaceCard from '../../common/PlaceCard';
import { search } from '../../helpers';

import styles from './FoundPlaces.module.scss';

const FoundPlaces = ({ searchInput }: { searchInput: string }) => {
  return (
    <div className={styles.foundPlaces}>
      <h4> {JSON.stringify(search(searchInput))}</h4>
      {search(searchInput)?.map((place) => {
        if (place.regions) {
          return (
            <Accordion
              key={place.code}
              sx={(theme) => ({
                backgroundColor: '#080808 !important',
                color: '#FFF',
                marginBottom: '10px',
              })}
            >
              <AccordionSummary
                key={place.code}
                aria-expanded
                expandIcon={
                  <Image
                    src={'onboarding/arrow.svg'}
                    alt={'arrow'}
                    width={24}
                    height={24}
                  />
                }
                sx={{ maxWidth: '566px' }}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <div className={styles.foundPlacesAccordionSummary}>
                  <PlaceCard key={place.code} place={place} />
                </div>
              </AccordionSummary>
              <AccordionDetails>
                {place.regions.map((region, i) => (
                  <PlaceCard key={i} place={region} />
                ))}
              </AccordionDetails>
            </Accordion>
          );
        }


        return <PlaceCard key={place.code} place={place} />;
      })}

    </div>
  );
};

export default FoundPlaces;
