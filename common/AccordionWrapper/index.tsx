import { ReactNode } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Image from 'next/image';
import { RegionCategory } from '../../data/attackRegionsData';

type TStyle = {
  [key: string]: string;
};

interface IAccordionWrapperProps {
  data: RegionCategory;
  children: ReactNode;
  expanded: number;
  styles: TStyle;
  handleExpansion: (panel: any) => (event: any, isExpanded: any) => void;
}

const AccordionWrapper = ({
  children,
  expanded,
  data,
  handleExpansion,
  styles,
}: IAccordionWrapperProps) => {
  return (
    <Accordion
      expanded={expanded === data.id}
      onChange={handleExpansion(data.id)}
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.87) !important',
        color: '#fff',
        marginBottom: '10px',
      }}
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
        aria-controls={`${data.id}-content`}
        id={`${data.id}-header`}
      >
        <h5>{data.title}</h5>
      </AccordionSummary>
      <AccordionDetails
        style={{
          flexWrap: 'wrap',
          display: 'flex',
          gap: '10px',
          overflow: 'scroll',
          height: styles.accordionDetailsHeight,
          maxHeight: styles.accordionDetailsMaxHeight
        }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionWrapper;
