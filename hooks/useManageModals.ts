import { useEffect } from 'react';
import { DAMAGE_LEVEL_MODAL, REGION_MODAL } from '../constants';

const useManageModals = (
  openModal: string,
  setSelectRegionOpen: TSetBoolean,
  setSelectDamageOpen: TSetBoolean
) => {
  useEffect(() => {
    switch (openModal) {
      case REGION_MODAL:
        setSelectRegionOpen(true);
        setSelectDamageOpen(false);
        break;
      case DAMAGE_LEVEL_MODAL:
        setSelectRegionOpen(false);
        setSelectDamageOpen(true);
        break;

      default:
        break;
    }
  }, [openModal]);
};

export default useManageModals;
