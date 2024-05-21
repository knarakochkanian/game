import styles from './ModalData.module.scss';

interface IModalDataProps {
  name: string;
  value?: any;
  from?: string;
}

const ModalData = ({ name, value, from = '' }: IModalDataProps) => {
  return (
    <div className={`${styles.modalData} ${styles[from]}`}>
      <div className={styles.key}>{name}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
};

export default ModalData;
