'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import useSetStateByElementHeight from '../../hooks/useSetStateByElementHeight';

import styles from './NewsCard.module.scss';

const NewsCard = ({ news }: { news: INews }) => {
  const [pNumOfLines, setPNumOfLines] = useState(3); // Default max length
  const titleRef = useRef<HTMLHeadingElement>(null); // Reference to the title element

  useSetStateByElementHeight(setPNumOfLines, titleRef);

  return (
    <article
      className={`${styles.newsCard} ${
        pNumOfLines === 2 ? styles.pTwoLines : ''
      }`}
    >
      <Image
        src={news.channelLogoSrc}
        alt="channelLogo"
        width={85}
        height={25}
        priority
      />

      <div>
        <h2 ref={titleRef}>{news.title}</h2>
        <p>{news.content}</p>
      </div>
    </article>
  );
};

export default NewsCard;
