import { useEffect } from 'react';
import { DAMAGE_LEVEL_MODAL, INDUSTRY_MODAL, REGION_MODAL } from '../constants';

const useManageModals = (
  openModal: string,
  setSelectRegionOpen: TSetBoolean,
  setSelectDamageOpen: TSetBoolean,
  setSelectIndustryOpen: TSetBoolean
) => {
  useEffect(() => {
    switch (openModal) {
      case REGION_MODAL:
        setSelectRegionOpen(true);
        setSelectDamageOpen(false);
        setSelectIndustryOpen(false);
        break;
      case DAMAGE_LEVEL_MODAL:
        setSelectRegionOpen(false);
        setSelectDamageOpen(true);
        setSelectIndustryOpen(false);
        break;
      case INDUSTRY_MODAL:
        setSelectRegionOpen(false);
        setSelectDamageOpen(false);
        setSelectIndustryOpen(true);
        break;
      default:
        break;
    }
  }, [openModal]);
};

export default useManageModals;
