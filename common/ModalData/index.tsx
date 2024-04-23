import styles from './ModalData.module.scss';

interface IModalDataProps {
  name: string;
  value: string;
}

const ModalData = ({ name, value }: IModalDataProps) => {
  return (
    <div className={styles.modalData}>
      <div className={styles.key}>{name}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
};

export default ModalData;
