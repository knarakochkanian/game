import { ReactNode } from 'react';
import BaseButton from '../../common/BaseButtton';
import ModalWithSelect from '../../common/Modals/ModalWithSelect';
import { selectIsAttacking } from '../../redux/features/generalSlice';
import { useAppSelector } from '../../redux/hooks';

interface ISelectProps {
  handleSelectOpen: () => void;
  selectOpen: boolean;
  children: ReactNode;
  name: string;
}

const Select = ({
  handleSelectOpen,
  selectOpen,
  children,
  name,
}: ISelectProps) => {
  const isAttacking = useAppSelector(selectIsAttacking);

  return (
    <>
      <BaseButton
        protectMode={!isAttacking}
        onClick={handleSelectOpen}
        active={selectOpen}
      >
        {name}
      </BaseButton>

      <ModalWithSelect from="main" isOpen={selectOpen} onClose={() => {}}>
        {children}
      </ModalWithSelect>
    </>
  );
};

export default Select;
