import Image from 'next/image';
import DateAndMinutes from '../../common/DateAndMinutes';

import styles from './NewsCardLarge.module.scss';

interface INewsCardLargeProps {
  news: INews;
  onClick?: () => void;
  from?: string;
}

const NewsCardLarge = ({ news, onClick, from }: INewsCardLargeProps) => {
  return (
    <article className={`${styles.newsCardLarge} ${from ? styles[from] : ''}`}>
      <div className={styles.imgContainer}>
        <Image
          src={news.imgSrc as string}
          alt="newsCardImg"
          width={0}
          height={0}
          sizes="100vw"
          className={styles.newsCardImg}
          priority
        />
      </div>

      <div>
        <div className={styles.logoAndDateCtn}>
          <Image
            src={news.channelLogoSrc as string}
            alt="channelLogo"
            width={85}
            height={25}
            priority
          />
          {from === 'fromSingleNewsModal' && (
            <DateAndMinutes
              date={news.date as string}
              minutes={news.minutes as number}
            />
          )}
        </div>

        <div className={styles.infoCtn}>
          <h2>{news.title}</h2>
          <p>
            {from === 'fromSingleNewsModal'
              ? news.contentInDetails
              : news.content}
          </p>
          {from !== 'fromSingleNewsModal' && (
            <DateAndMinutes
              date={news.date as string}
              minutes={news.minutes as number}
            />
          )}
        </div>
      </div>

      {onClick && <button onClick={onClick}>подробнее</button>}
    </article>
  );
};

export default NewsCardLarge;
