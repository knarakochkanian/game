import Image from 'next/image';
import { minusSign } from '../../public/main-screen';

import styles from './IndustryCard.module.scss';
import { useAppDispatch } from '../../redux/hooks';
import { proccesIndustriesByTitle } from '../../redux/features/generalSlice';
import { RESET } from '../../constants';

interface IIndustryCardProps {
  title: string;
}

const IndustryCard = ({ title }: IIndustryCardProps) => {
    const dispatch = useAppDispatch();

    const onClick = () => {
 dispatch(proccesIndustriesByTitle({actionType: RESET, title}));
    };

  return (
    <article className={styles.industryCard}>
      <h3>{title}</h3>
      <button
        onClick={() => onClick()}
        className={styles.minusButton}
      >
        <Image
          className={styles.minusSign}
          src={minusSign}
          alt="minusSign"
          width={20}
          height={20}
          priority
        />
      </button>
    </article>
  );
};

export default IndustryCard;
