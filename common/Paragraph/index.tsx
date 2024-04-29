import Arrow from '../Arrow';
import { truncateString } from '../../helpers';

import styles from './Paragraph.module.scss';

interface IParagraphProps {
  content: string;
  isOpen: boolean;
  setIsOpen: TSetBoolean;
}

const Paragraph = ({ content, isOpen, setIsOpen }: IParagraphProps) => {
  return (
    <>
      {isOpen ? (
        <p className={`${styles.paragraph} ${isOpen ? styles.isOpen : ''}`}>
          {content}
          <button onClick={() => setIsOpen(false)}>
            <Arrow name="paragraph" open={true} />
          </button>
        </p>
      ) : (
        <button onClick={() => setIsOpen(true)}>
          <p className={styles.paragraph}>
            {truncateString(content, 129)}
            <Arrow name="paragraph" open={false} />
          </p>
        </button>
      )}
    </>
  );
};

export default Paragraph;
