import { useEffect, useState } from 'react';
import AccordionWrapper from '../../common/AccordionWrapper';
import SectorOptions from '../SectorOptions';
import { INDUSTRY } from '../../constants';

import styles from './IndustrySector.module.scss';

interface IIndustrySectorProps {
  sector: ISector;
  expanded: number;
  handleExpansion: (panel: any) => (event: any, isExpanded: any) => void;
}

const IndustrySector = ({
  sector,
  expanded,
  handleExpansion,
}: IIndustrySectorProps) => {
  const [titleHighlighted, setTitleHighlighted] = useState(false);
  const [selectedOtions, setSelectedOtions] = useState<ISectorOption[]>([]);

  useEffect(() => {
    const titleHighlighted_ = sector.options.every((option) => option.selected);
    const selectedOtions_ = sector.options.filter((option) => option.selected);

    setSelectedOtions(selectedOtions_);
    setTitleHighlighted(titleHighlighted_);
  }, [JSON.stringify(sector.options)]);

  return (
    <div className={styles.sectorCtn}>
      <AccordionWrapper
        from={INDUSTRY}
        selectedOtionsCount={selectedOtions.length}
        titleHighlighted={titleHighlighted}
        styles={{
          accordionDetailsHeight: 'unset',
          accordionDetailsMaxHeight: '532px',
        }}
        expanded={expanded}
        handleExpansion={handleExpansion}
        data={sector}
      >
        <SectorOptions fromLeftSideNav sectorOptions={sector.options} />
      </AccordionWrapper>
    </div>
  );
};

export default IndustrySector;
