import Link from 'next/link';
import NewsCard from '../NewsCard';
import { NEWS } from '../../constants';
import { useAppDispatch } from '../../redux/hooks';
import { setNewsActionId } from '../../redux/features/helpersSlice';

import styles from './ActionNews.module.scss';
import { copyFirstFourElements } from '../../helpers/helpers_2';

interface IActionNewsProps {
  news: INews[];
  id: string
}

const ActionNews = ({ news, id }: IActionNewsProps) => {
  const dispatch = useAppDispatch();
  const firstFourNews = copyFirstFourElements(news);

  const onSeeAll = () => {
    dispatch(setNewsActionId(id));
  }

  return (
    <section className={styles.actionNewsCtn}>
      <div className={styles.titleAndBtnCtn}>
        <h5>последствия в новостях</h5>
        <Link href={NEWS}>
          <button onClick={onSeeAll}>смотреть все</button>
        </Link>
      </div>

      <section className={styles.news}>
        {firstFourNews?.map((news, i) => (
          <NewsCard news={news} key={i} />
        ))}
      </section>
    </section>
  );
};

export default ActionNews;
