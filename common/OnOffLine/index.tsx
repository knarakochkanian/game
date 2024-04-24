import styles from './OnOffLine.module.scss';

const OnOffLine = ({ isOn }: { isOn: boolean }) => {
  return <span className={isOn ? styles.isOn : styles.isOff}></span>;
};

export default OnOffLine;
