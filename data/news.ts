import contentInDetails from '../constants/contentInDetails';
import {
  BBCLogo,
  foxNewsLogo,
  skyNewsLogo,
  theTimesLogo,
} from '../public/history';
import {
  BBCMainImg,
  FoxNewsMainImg,
  SkyNewsMainImg,
  TheTimesMainImg,
} from '../public/news';

const news: INews[] = [
  {
    content:
      'Из-за аварии в энергосистеме на юго-западе США без электричества остались почти 50 миллионов человек.',
    channelLogoSrc: BBCLogo,
    title: 'Блэкаут парализовал США',
  },
  {
    content:
      'Из-за случайного отключения ЛЭП от электростанции в провинции Онтарио  сработал так называемый каскадный эффект.',
    channelLogoSrc: skyNewsLogo,
    title: 'Канада погрузилась во тьму',
  },
  {
    content:
      'Мексиканская Федеральная комиссия по электричеству экстренно восстанавливает энергоснабжение в городе Нуэво-Ларедо.',
    channelLogoSrc: theTimesLogo,
    title: 'Экстренное отключение электричества в Мексике',
  },
  {
    content:
      'Экстренное отключение энергии ставит под угрозу жизнь 30 млн человек. Причина аварии предварительно в выходе из строя турбины.',
    channelLogoSrc: foxNewsLogo,
    title: 'Темнота накрыла США',
  },
];

export const news_2: INews[] = [
  {
    contentInDetails,
    imgSrc: BBCMainImg,
    content:
      'Из-за аварии в энергосистеме на юго-западе США без электричества остались почти 50 миллионов человек.',
    channelLogoSrc: BBCLogo,
    title: 'Блэкаут парализовал США',
    date: '24 Февр',
    minutes: 11,
  },
  {
    contentInDetails,
    imgSrc: FoxNewsMainImg,
    content:
      'Из-за случайного отключения ЛЭП от электростанции в провинции Онтарио  сработал так называемый каскадный эффект.',
    channelLogoSrc: foxNewsLogo,
    title: 'Канада погрузилась во тьму',
    date: '24 Февр',
    minutes: 7,
  },
  {
    contentInDetails,
    imgSrc: TheTimesMainImg,
    content:
      'Мексиканская Федеральная комиссия по электричеству экстренно восстанавливает энергоснабжение в городе Нуэво-Ларедо.',
    channelLogoSrc: theTimesLogo,
    title: 'Экстренное отключение электричества в Мексике',
    date: '24 Февр',
    minutes: 11,
  },
  {
    contentInDetails,
    imgSrc: SkyNewsMainImg,
    content:
      'Экстренное отключение энергии ставит под угрозу жизнь 30 млн человек. Причина аварии предварительно в выходе из строя турбины.',
    channelLogoSrc: skyNewsLogo,
    title: 'Темнота накрыла США',
    date: '24 Февр',
    minutes: 11,
  },
];

export default news;
