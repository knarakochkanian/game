import {
  selectIsAttacking,
  setSelectedIndusties,
} from '../../redux/features/generalSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Image from 'next/image';
import styles from './SectorOptions.module.scss';

interface ISectorOptionsProps {
  sectorOptions: ISectorOption[];
  fromSideNav?: boolean;
  src?: string;
}

const SectorOptions = ({ sectorOptions, fromSideNav }: ISectorOptionsProps) => {
  const dispatch = useAppDispatch();
  const isAttacking = useAppSelector(selectIsAttacking);
  const onClick = (name: string, parent: string) => {
    dispatch(setSelectedIndusties({ name, parent }));
  };

  return (
    <div className={styles.container}>
      {sectorOptions.map((option, i) => (
        <button
          disabled={fromSideNav}
          onClick={() => onClick(option.name, option.parent)}
          className={`${styles.option} ${
            option.selected && !fromSideNav ? styles.selected : ''
          } ${!option.selected && fromSideNav ? styles.displayNone : ''}
          ${!isAttacking ? styles.isProtecting : ''}
          ${option.src ? styles.hasImage : ''}\`}
          `}
          key={i}
        >
          {option.src && (
            <Image src={option.src} alt="img" width={48} height={48} />
          )}
          {option.name}
        </button>
      ))}
    </div>
  );
};

export default SectorOptions;
