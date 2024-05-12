import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Image from 'next/image';
import PlaceCard from '../../common/PlaceCard';
import { Option } from '../../data/attackRegionsData';

import styles from './Places.module.scss';

const Places = ({ places }: { places: (IPlace | Option)[] | undefined }) => {
  if (places === undefined) {
    return null;
  }

  return (
    <div className={styles.places}>
      {(places as IPlace[]).map((place) => {
        if (place.regions) {
          return (
            <Accordion
              key={place.code}
              sx={() => ({
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
                <div className={styles.placesAccordionSummary}>
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

export default Places;
