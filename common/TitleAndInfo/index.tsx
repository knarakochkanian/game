import styles from './TitleAndInfo.module.scss';

const TitleAndInfo = ({ info, title }: { title: string; info: string }) => {
  return (
    <div className={styles.titleAndInfo}>
      <span className={styles.title}>{title}</span>
      <span className={styles.info}>{info}</span>
    </div>
  );
};

export default TitleAndInfo;
