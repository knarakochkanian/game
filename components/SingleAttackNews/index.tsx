'use client';

import { useState } from 'react';
import NewsCardLarge from '../NewsCardLarge';
import SingleNewsModal from '../SingleNewsModal';
import useCloseModal from '../../hooks/useCloseModal';

import styles from './SingleAttackNews.module.scss';

const SingleAttackNews = ({ news }: { news: INews[] }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalNews, setModalNews] = useState<INews>();
  const onClick = (news: INews) => {
    setModalNews(news);
    setModalOpen(true);
  };

  useCloseModal(modalOpen, setModalOpen, 'dialog');

  return (
    <>
      <section className={styles.singleAttackNews}>
        {news ? (
          <div className={styles.newsContainer}>
            {news.map((singleNews, i) => (
              <NewsCardLarge
                onClick={() => onClick(singleNews)}
                key={i}
                news={singleNews}
              />
            ))}
          </div>
        ) : (
          <h1>Нет новостей об этой атаке</h1>
        )}
      </section>

      {modalOpen && (
        <SingleNewsModal
          setModalClose={() => setModalOpen(false)}
          news={modalNews as INews}
        />
      )}
    </>
  );
};

export default SingleAttackNews;
