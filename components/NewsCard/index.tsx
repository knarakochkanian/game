'use client';

import Image from 'next/image';
import { truncateString } from '../../helpers';
import { useRef, useState } from 'react';
import useSetStateByElementHeight from '../../hooks/useSetStateByElementHeight';

import styles from './NewsCard.module.scss';

const NewsCard = ({ news }: { news: INews }) => {
  const [pMaxLength, setPMaxLength] = useState(82); // Default max length
  const titleRef = useRef<HTMLHeadingElement>(null); // Reference to the title element

  useSetStateByElementHeight(setPMaxLength, titleRef);

  return (
    <article className={styles.newsCard}>
      <Image
        src={news.channelLogoSrc}
        alt="channelLogo"
        width={181}
        height={53}
        priority
      />

      <div>
        <h2 ref={titleRef}>{news.title}</h2>
        <p>{truncateString(news.content, pMaxLength)}</p>
      </div>
    </article>
  );
};

export default NewsCard;
