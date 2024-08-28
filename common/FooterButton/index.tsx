import { ReactNode } from 'react';
import styles from './FooterButton.module.scss';

interface FooterButtonProps {
  onClick?: () => void;
  title: string;
  order: string;
  from?: string;
  buttonInfo?: ReactNode;
  buttonRef?: React.RefObject<HTMLButtonElement>;
  sx?: React.CSSProperties;
}

const FooterButton = ({
  onClick,
  order,
  title,
  from = '',
  buttonInfo,
  buttonRef,
  sx = {},
}: FooterButtonProps) => {
  const classname = `from${from}`;
  return (
    <div className={`${styles.buttonContainer} ${styles[classname]}`}>
      <button
        onClick={onClick}
        ref={buttonRef}
        // style={onClick ? sx : { ...sx, pointerEvents: 'none' }}
        style={onClick ? sx : { ...sx }}
      >
        <h3>
          {title}
          <span> {`“${order}"`}</span>
        </h3>
      </button>

      {buttonInfo}
    </div>
  );
};

export default FooterButton;
