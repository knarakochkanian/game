import { SetStateAction, useEffect } from 'react';
import { findFirstSectorWithSelectedOption } from '../helpers';

const useDefaultExpandedSector = (
  industrySectors: ISector[],
  setExpanded: (value: SetStateAction<number>) => void
) => {
  useEffect(() => {
    const defaultExpanded =
      findFirstSectorWithSelectedOption(industrySectors) !== -1
        ? findFirstSectorWithSelectedOption(industrySectors)
        : 0;

    setExpanded(industrySectors[defaultExpanded].id);
  }, [JSON.stringify(industrySectors)]);
};

export default useDefaultExpandedSector;
