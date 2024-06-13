import { selectComfirmedFromOnboarding } from '../../redux/features/generalSlice';
import { useAppSelector } from '../../redux/hooks';
import Arrow from '../Arrow';

import styles from './Paragraph.module.scss';

interface IParagraphProps {
  content: any;
  isOpen: boolean;
  setIsOpen: TSetBoolean;
}

const Paragraph = ({ content, isOpen, setIsOpen }: IParagraphProps) => {
  const fromOnboarding = useAppSelector(selectComfirmedFromOnboarding);

  return (
    <>
      {isOpen ? (
        <p className={`${styles.paragraph} ${isOpen ? styles.isOpen : ''}`}>
          {content}
          <button disabled={fromOnboarding} onClick={() => setIsOpen(false)}>
            <Arrow name="paragraph" open={true} />
          </button>
        </p>
      ) : (
        <button disabled={fromOnboarding} onClick={() => setIsOpen(true)}>
          <p className={styles.paragraph}>
            {content}
            <Arrow name="paragraph" open={false} />
          </p>
        </button>
      )}
    </>
  );
};

export default Paragraph;
