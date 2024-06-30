import { getDayAndMonthAbbr, getRandomChannelLogo, getRandomNewsPic, getTopCapitalizationNews, joinStrings } from './helpers_1';

type TNewsData = {
  [key: string]: INews[];
};

const getNewsData = (countries: string[], date: string, top_capitalizationNews: INews[]): TNewsData => {
  const formatedDate = getDayAndMonthAbbr(date);

  const countriesStr = joinStrings(countries); 

  return {
    APK: [
      {
        contentInDetails:
          'Хакеры устроили массированную кибератаку на весь агропромышленный комплекс. Производственные процессы остановлены, логистические цепочки нарушены.',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Ждать пустых полок в магазинах?',
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          'АПК не может работать в штатном режиме, работа на предприятиях временно остановлена. Масштабная кибератака на агросектор может привести к изменениям на продуктовом рынке.',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Хакеры устроили коллапс в агросекторе',
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          'Хакеры нарушили нормальную работу систем предприятий.',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Агропромышленный комплекс терпит финансовые убытки',
        date: formatedDate,
        fullDate: date,        
      },
    ],
    WATER_SUPPLY: [
      {
        contentInDetails:
          'Кибератака на систему водоснабжения вывела из строя все оборудование. Затоплены населенные пункты.',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Хакеры устроили настоящее наводнение',
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          'Хакеры «взорвали» предприятия, занимающиеся водоочисткой. Трубы разрываются, насосы не работают… а кто-то управляет этим издалека!',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Крупные аварии на нескольких предприятиях по очистке воды',
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          'Киберхакеры нанесли атаки на системы водоснабжения. Все квартиры — в воде. Улицы тоже.',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Город уходит под воду',
        date: formatedDate,
        fullDate: date,        
      },
    ],
    ARMED_FORCES: [
      {
        contentInDetails:
          'После кибератаки на командные центры вооруженных сил секретная информация в публичном доступе. Страна в трудном положении.',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Ситуация критическая',
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          'После кибератаки на командные центры вооруженных сил вся критически важная информация стала зашифрованной, ее невозможно использовать. Появились сбои в управлении войсками.',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'На дешифровку уйдут месяцы!',
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          'После хакерской атаки системы связи в вооруженных силах работают с перебоями.',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Перебои со связью в командных центрах',
        date: formatedDate,
        fullDate: date,        
      },
    ],
    VPK: [
      {
        contentInDetails:
          '104 000 хакеров устроили масштабную кибератаку на военно-промышленные комплексы крупнейших стран мира',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Кибербитва за секреты супердержав',
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          `Крупномасштабная кибератака на военно-промышленные комплексы ${countriesStr}`,
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Тайны НАТО под угрозой',
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          'Масштабная кибератака угрожает оборонным производствам крупных государств',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Планета под киберогнем',
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          `${countriesStr} на прицеле хакерской армии в исторической по масштабам кибератаке`,
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Шторм из киберпространства',
        date: formatedDate,
        fullDate: date,        
      },
    ],
    GOS_INFRASTRUCTURES: [
      {
        contentInDetails:
          `Шифровальщики объединились против правительств лидеров ${countriesStr}`,
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Киберапокалипсис в самом сердце Европы',
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          `С началом работы приёмных комиссий хакеры запустили лавину DDoS-атак на вузы`,
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Старейшие университеты мира столкнулись с кратным простом кибератак',
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          'Конфиденциальные данные чиновников большинства стран мира выставлены на продажу в даркнете',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Хакеры нацелились на госсектор',
        date: formatedDate,
        fullDate: date,        
      },
    ],
    MINING: [
      {
        contentInDetails:
          `Хакеры взламывают системы управления на предприятиях по добыче нефти, газа и других полезных ископаемых. Экономисты прогнозируют большой финансовый кризис.`,
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Добыча полезных ископаемых в стране под угрозой',
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          `Произошла кибератака на предприятия по добыче полезных ископаемых. Экспорт нефти и газа остановлен на неопределенное время.`,
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Миллиардные убытки из-за хакерского взлома',
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          'Хакеры произвели атаку на предприятия по добыче полезных ископаемых. Промышленники терпят многомиллионные финансовые убытки.',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Из-за хакеров не работает оборудование',
        date: formatedDate,
        fullDate: date,        
      },
    ],
    HEALTHCARE: [
      {
        contentInDetails:
          `Кибератака на учреждения здравоохранения разрушила логистическую цепочку поставок медикаментов. На решение проблемы уйдет несколько дней.`,
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Больные не дождутся своих лекарств?',
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          `В отрасли все на ушах. После кибератаки вся финансовая документация организаций оказалась в руках злоумышленников, логистические цепочки работают со сбоями.`,
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Хакеры вскрыли финансовую документацию и разрушили логистику здравоохранения',
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          'Хакеры взломали больницы и санитарно-эпидемиологические службы, чтобы получить финансовую документацию. Всему виной — невнимание к кибербезопасности.',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Отрасль здравоохранения терпит убытки из-за своей недальновидности',
        date: formatedDate,
        fullDate: date,        
      },
    ],
    SPACE: [
      {
        contentInDetails:
          `Группа хакеров атаковала космическую отрасль, угрожая миссиям на орбите`,
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: `Космический кризис в ${countriesStr}`,
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          `Хакеры угрожают жизням экипажей и спутниковому оборудованию`,
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Космос под атакой',
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          'В центрах управления потеряли связь с космическими объектами из-за серии кибератак',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Крупный сбой космических полётов',
        date: formatedDate,
        fullDate: date,        
      },
    ],
    EDUCATION: [
      {
        contentInDetails:
          `Масштабная кибератака на учреждения образования запустила вредоносную программу в компьютеры. Вылечить их не получится, придется покупать новые.`,
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: `В школах и вузах «сгорела» вся компьютерная техника`,
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          `Массированная кибератака на учебные заведения вывела из строя всю аппаратуру и сделала невозможной проведение занятий.`,
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Хакеры сорвали уроки по всей стране',
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          'Киберпреступники взламывают компьютеры и рассылают неприличный спам.',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Образование под прицелом хакеров',
        date: formatedDate,
        fullDate: date,        
      },
    ],
    INDUSTRY: [
      {
        contentInDetails:
          `В топливной промышленности произошли масштабные сбои после атаки APT-группировки`,
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: `Страны ${countriesStr} на грани катастрофы`,
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          `Причина — масштабная кибератака на объекты сразу в нескольких странах`,
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'В головном офисе BMW Group сообщили о приостановке работы заводов',
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          'Какие шаги планируют предпринять правительства?',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: `Страны ${countriesStr} потеряли 16 миллиардов долларов из-за кибератаки на промышленный сектор`,
        date: formatedDate,
        fullDate: date,        
      },
    ],
    NETWORK_COMUNICATION: [
      {
        contentInDetails:
          `Руководители крупнейших сетей связи держатся за головы и в панике восстанавливают киберзащиту систем после массированной атаки хакеров.`,
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: `На восстановление уйдут месяцы`,
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          `Хакеры взломали все доступные сети связи. Данные каждого абонента теперь гуляют по интернету.`,
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Персональные данные миллионов абонентов слиты в сеть',
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          'Хакеры украли персональные данные миллионов абонентов и выложили их в публичный доступ.',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: `Достаточно просто написать ФИО`,
        date: formatedDate,
        fullDate: date,        
      },
    ],
    SMI: [
      {
        contentInDetails:
          `Хакеры взломали все СМИ и распространяют недостоверную информацию.`,
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: `Не доверяйте никаким информационным источникам!`,
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          `Кибератака на СМИ привела к масштабным сбоям в работе информационных источников по всей стране.`,
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Хаос в СМИ',
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          'После атаки хакеров средства массовой информации работают с перебоями.',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: `Полномасштабная атака на СМИ`,
        date: formatedDate,
        fullDate: date,        
      },
    ],
    CONSTRUCTION: [
      {
        contentInDetails:
          `Производства остановлены, компании не могут выполнять свои обязательства — в стране возможен экономический кризис.`,
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: `Сфера строительства под кибератакой`,
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          `После кибератаки нарушены все логистические цепочки, промышленники считают убытки, а подрядчики переносят сроки.`,
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Хакеры разносят всю сферу строительства',
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          'Коллапс в сфере недвижимости — стройки прекратили получать стройматериалы из-за сбоев в логистике, которые устроили хакеры.',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: `Все строительные работы остановлены после кибератаки`,
        date: formatedDate,
        fullDate: date,        
      },
    ],
    TRADE: [
      {
        contentInDetails:
          `Кибератака превращает онлайн-торговлю в поле битвы`,
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: `Хакеры украли со счетов крупнейшего мирового маркетплейса 50 млрд долларов`,
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          `Известный маркетплейс стал жертвой кибератаки`,
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Персональные данные покупателей в опасности',
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          'Глобальные бизнесы теряют миллиарды из-за массовой кибератаки',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: `Шок для розничной торговли`,
        date: formatedDate,
        fullDate: date,        
      },
    ],
    TRANSPORT_SYSTEM: [
      {
        contentInDetails:
          `Киберпреступники атакуют международные авиакомпании, угрожая мировому воздушному сообщению`,
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: `Воздушный хаос`,
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          `Массовая атака на системы грузоперевозок вызвала задержку доставки на 15 дней`,
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Товары из Китая не будут доставлены вовремя',
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          'Хакеры атакуют уже не в первый раз',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: `Вредоносные письма парализовали работу железных дорог`,
        date: formatedDate,
        fullDate: date,        
      },
    ],
    TOURISM: [
      {
        contentInDetails:
          `Для прошедшей накануне кибератаки хакеры создали тысячи поддельных интернет-страниц туристических компаний, чтобы украсть данные банковских карт плательщиков.`,
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: `Забронировали отдых в санатории? Срочно блокируйте карту!`,
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          `Чтобы собирать персональные данные плательщиков, хакеры сделали поддельные интернет-страницы туристических компаний.`,
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Киберпреступники выложили в сеть документы тысяч обманутых туристов',
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          'Массированная кибератака на туристические компании позволила хакерам выкрасть тысячи персональных данных.',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: `Не время отдыхать — время защищаться!`,
        date: formatedDate,
        fullDate: date,        
      },
    ],
    FINANCE_SYSTEM: [

    ],
    ENERGY: [
      {
        contentInDetails:
          `Хакерская атака угрожает стабильности энергоснабжения`,
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: `Кибервзрыв на крупнейшей гидроэлектростанции`,
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          `Жителям угрожает энергетическая катастрофа`,
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Мощный киберудар по гидроэлектростанции',
        date: formatedDate,
        fullDate: date,        
      },
      {
        contentInDetails:
          'Крупные города остались без электричества из-за действий хакеров',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: `Энергетический кризис в сердце ${countriesStr}`,
        date: formatedDate,
        fullDate: date,        
      },
    ],
    COMPANY_TOP_CAPITALIZATION: top_capitalizationNews,
  };
};

interface INewsObj {
  [key: string]: any;
}

const proccessNewsData = (
  countries: string[],
  date: string,
  industries: (string | undefined)[],
  topCapitalizationSector: ISector
) => {
  if(typeof industries[0] === 'undefined') return [];
  let topCapitalizationNews: INews[] = [];

  if (industries.includes('COMPANY_TOP_CAPITALIZATION')) {
    topCapitalizationNews = [...getTopCapitalizationNews(topCapitalizationSector, date)]
  }

  const newsData: INewsObj = getNewsData(countries, date, topCapitalizationNews);
  let news: INews[] = [];

  industries.forEach((idustry) => {
    news = [...news, ...newsData[idustry as string]];
  });

  return news;
};

export default proccessNewsData;
