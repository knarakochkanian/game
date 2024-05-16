import { setSelectedIndusties } from '../../redux/features/generalSlice';
import { useAppDispatch } from '../../redux/hooks';

import styles from './SectorOptions.module.scss';

interface ISectorOptionsProps {
  sectorOptions: ISectorOption[];
  fromSideNav?: boolean;
}

const SectorOptions = ({ sectorOptions, fromSideNav }: ISectorOptionsProps) => {
  const dispatch = useAppDispatch();
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
          } ${!option.selected && fromSideNav ? styles.displayNone : ''}`}
          key={i}
        >
          {option.name}
        </button>
      ))}
    </div>
  );
};

export default SectorOptions;
