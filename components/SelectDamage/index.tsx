import BaseButton from '../../common/BaseButtton';
import ModalWithSelect from '../../common/Modals/ModalWithSelect';
import { selectIsAttacking } from '../../redux/features/generalSlice';
import { useAppSelector } from '../../redux/hooks';
import SelectDamageModal from '../SelectDamageModal';

import styles from './SelectDamage.module.scss';

interface ISelectDamageProps {
  handleDamageSelectOpen: () => void;
  selectDamageOpen: boolean;
}

const SelectDamage = ({
  handleDamageSelectOpen,
  selectDamageOpen,
}: ISelectDamageProps) => {
  const isAttacking = useAppSelector(selectIsAttacking);

  return (
    <>
      <BaseButton
        protectMode={!isAttacking}
        onClick={handleDamageSelectOpen}
        active={selectDamageOpen}
      >
        Ущерб
      </BaseButton>

      <ModalWithSelect
        isOpen={selectDamageOpen}
        onClose={() => {}}
      >
        <SelectDamageModal />
      </ModalWithSelect>
    </>
  );
};

export default SelectDamage;
