import { useEffect } from 'react';

const useManageModals_2 = (
  openModal: number,
  setFirstOpen: TSetBoolean,
  setSecondOpen: TSetBoolean,
  setThirdOpen: TSetBoolean
) => {
  useEffect(() => {
    switch (openModal) {
      case 1:
        setFirstOpen(true);
        setSecondOpen(false);
        setThirdOpen(false);
        break;
      case 2:
        setFirstOpen(false);
        setSecondOpen(true);
        setThirdOpen(false);
        break;
      case 3:
        setFirstOpen(false);
        setSecondOpen(false);
        setThirdOpen(true);
        break;
      default:
        setFirstOpen(false);
        setSecondOpen(false);
        setThirdOpen(false);
        break;
    }
  }, [openModal]);
};

export default useManageModals_2;
