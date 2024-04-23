import styles from './OnOffLine.module.scss';

const OnOffLine = ({ isOn }: { isOn: boolean }) => {
  return <div className={isOn ? styles.isOn : styles.isOff}></div>;
};

export default OnOffLine;
