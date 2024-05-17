import { SetStateAction, useEffect } from 'react';
import { findFirstSectorWithSelectedOption } from '../helpers';

const useDefaultExpandedSector = (
  industrySectors: ISector[],
  setExpanded: (value: SetStateAction<number>) => void
) => {
  useEffect(() => {
    const defaultExpanded =
      findFirstSectorWithSelectedOption(industrySectors).sectorIndex !== -1
        ? findFirstSectorWithSelectedOption(industrySectors).sectorIndex
        : 0;

    setExpanded(industrySectors[defaultExpanded].id);
  }, [JSON.stringify(industrySectors)]);
};

export default useDefaultExpandedSector;
