import ModalContainer from '../../common/ModalContainer';
import NewsCardLarge from '../NewsCardLarge';
import styles from './SingleNewsModal.module.scss';

const SingleNewsModal = ({
  news,
  setModalClose,
}: {
  news: INews;
  setModalClose: () => void;
}) => {
  return (
    <div className={styles.singleNewsModal}>
      <ModalContainer setModalClose={setModalClose} name="singleNews">
        <NewsCardLarge from="fromSingleNewsModal" news={news} />
      </ModalContainer>
    </div>
  );
};

export default SingleNewsModal;
