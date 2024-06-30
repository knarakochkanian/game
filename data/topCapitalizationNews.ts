import { getDayAndMonthAbbr, getRandomChannelLogo, getRandomNewsPic } from '../helpers/helpers_1';

const getTopCapitalizationNews_2 = (date: string) => {
  const formatedDate = getDayAndMonthAbbr(date);

  return {
    Google: [
      {
        contentInDetails:
          'Хакеры взломали сервис по работе с онлайн-документами и раскрыли конфиденциальные данные тысяч пользователей. Компания понесет колоссальные финансовые убытки.',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Google в нокауте',
        date: formatedDate, 
        fullDate: date,       
      },
      {
        contentInDetails:
          'Кибератака на Google позволила преступникам выложить в открытый доступ персональную и рабочую документацию, которую ведут пользователи в сервисе по работе с онлайн-документами.',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Хакеры узнают, чем вы занимаетесь',
        date: formatedDate, 
        fullDate: date,       
      },
      {
        contentInDetails:
          'После кибератаки на Google данные десятков тысяч пользователей теперь зашифрованы.',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Все данные потеряны безвозвратно',
        date: formatedDate, 
        fullDate: date,       
      },
    ],
    Apple: [
      {
        contentInDetails:
          'После кибератаки на серверы Apple хакеры по всему миру изучают техническую документацию, чтобы найти уязвимости системы и взломать очередной айфон.',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Apple больше не сможет хвастаться своей непробиваемой защитой',
        date: formatedDate, 
        fullDate: date,       
      },
      {
        contentInDetails:
          'В сеть слита вся информация о последних разработках компании. Ждать презентации нет никакого смысла. Apple терпит финансовые убытки.',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Хакеры сорвали презентацию Apple',
        date: formatedDate, 
        fullDate: date,       
      },
      {
        contentInDetails:
          'До презентации еще 3 месяца, но мы уже знаем, чего ожидать. Хакеры выложили в сеть информацию о новых продуктах. Чтобы получить данные, злоумышленники взломали серверы компании.',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Хакеры рассказали о новых продуктах Apple',
        date: formatedDate, 
        fullDate: date,       
      },
    ],
    Microsoft: [
      {
        contentInDetails:
          'Хакеры взломали корпоративную сеть, получили доступ к финансовой документации и сорвали крупные контракты.',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Microsoft подверглась кибератаке',
        date: formatedDate, 
        fullDate: date,       
      },
      {
        contentInDetails:
          'Если хакеры добыли финансовую документацию, то легко могут получить данные всех пользователей — так говорят простые люди.',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title:
          'Пользователи сервисов Microsoft боятся за свои персданные после кибератаки на корпорацию',
        date: formatedDate, 
        fullDate: date,       
      },
      {
        contentInDetails:
          'После кибератаки мегакорпорация уже не сможет заключить запланированные контракты — вся информация гуляет в открытом доступе.',
        imgSrc: getRandomNewsPic(),
        channelLogoSrc: getRandomChannelLogo(),
        title: 'Microsoft считает миллиардные убытки после хакерской атаки',
        date: formatedDate, 
        fullDate: date,       
      },
    ],
    Amazon: [
        {
            contentInDetails:
              'Хакеры взломали почтовый домен компании и опубликовали в интернете всю рабочую документацию и персональные данные сотрудников.',
            imgSrc: getRandomNewsPic(),
            channelLogoSrc: getRandomChannelLogo(),
            title: 'Amazon «рассекретили»',
            date: formatedDate, 
            fullDate: date,           
          },
          {
            contentInDetails:
              'Теперь каждый может узнать о внутренней кухне компании.',
            imgSrc: getRandomNewsPic(),
            channelLogoSrc: getRandomChannelLogo(),
            title:
              'Кибератака на Amazon позволила хакерам получить доступ к корпоративной переписке',
            date: formatedDate, 
            fullDate: date,           
          },
          {
            contentInDetails:
              'После кибератаки персональные данные тысяч сотрудников выложены в интернет.',
            imgSrc: getRandomNewsPic(),
            channelLogoSrc: getRandomChannelLogo(),
            title: 'Данные сотрудников Amazon слили в сеть',
            date: formatedDate, 
            fullDate: date,           
          },
    ],
    NVIDIA: [
        {
            contentInDetails:
              'После взлома хакеров компания пытается восстановить рабочий процесс, но данные тысяч сотрудников уже гуляют где-то в интернете.',
            imgSrc: getRandomNewsPic(),
            channelLogoSrc: getRandomChannelLogo(),
            title: 'Nvidia терпит финансовые сложности и теряет репутацию',
            date: formatedDate, 
            fullDate: date,           
          },
          {
            contentInDetails:
              'Хакеры получили доступ к учетным данным сотрудников и запустили вредоносный вирус во внутреннюю систему.',
            imgSrc: getRandomNewsPic(),
            channelLogoSrc: getRandomChannelLogo(),
            title:
              'После кибератаки остановлена работа в Nvidia',
            date: formatedDate, 
            fullDate: date,           
          },
          {
            contentInDetails:
              'После кибератаки на Nvidia данные тысяч сотрудников компании выложены в свободный доступ.',
            imgSrc: getRandomNewsPic(),
            channelLogoSrc: getRandomChannelLogo(),
            title: 'Сотрудники Nvidia жалуются на отсутствие киберзащиты в компании',
            date: formatedDate, 
            fullDate: date,           
          },
    ],
    Meta: [
        {
            contentInDetails:
              'Те, кто установил приложение с помощью вредоносного установщика, потеряли доступ ко всем личным данным.',
            imgSrc: getRandomNewsPic(),
            channelLogoSrc: getRandomChannelLogo(),
            title: 'Хакеры взломали устройства через мессенджер',
            date: formatedDate, 
            fullDate: date,           
          },
          {
            contentInDetails:
              'Сотни тысяч пользователей популярного мессенджера негодуют из-за огромного количества спама. Все из-за вредоносного ПО, которое распространили хакеры.',
            imgSrc: getRandomNewsPic(),
            channelLogoSrc: getRandomChannelLogo(),
            title:
              'Такого количества спама еще никто не видел!',
            date: formatedDate, 
            fullDate: date,           
          },
          {
            contentInDetails:
              'Все из-за вредоносного ПО, которое распространяют через установщик популярного мессенджера.',
            imgSrc: getRandomNewsPic(),
            channelLogoSrc: getRandomChannelLogo(),
            title: 'Репутация Meta подорвана',
            date: formatedDate, 
            fullDate: date,           
          },
    ],
    Visa: [
        {
            contentInDetails:
              'Хакеры сделали невозможным проведение любых операций с картами.',
            imgSrc: getRandomNewsPic(),
            channelLogoSrc: getRandomChannelLogo(),
            title: 'Киберпреступники взломали компанию Visa',
            date: formatedDate, 
            fullDate: date,           
          },
          {
            contentInDetails:
              'Кибератака на платежные сервисы компании привела к невозможности для клиентов оплачивать покупки.',
            imgSrc: getRandomNewsPic(),
            channelLogoSrc: getRandomChannelLogo(),
            title:
              'Visa считает убытки',
            date: formatedDate, 
            fullDate: date,           
          },
          {
            contentInDetails:
              'Обладатели карт сообщают о длительных задержках при проведении платежных операций.',
            imgSrc: getRandomNewsPic(),
            channelLogoSrc: getRandomChannelLogo(),
            title: 'Кибератака на Visa не прошла незамеченной',
            date: formatedDate, 
            fullDate: date,           
          },
    ],
    Mastercard: [
        {
            contentInDetails:
              'Фишингу подвержены все, даже крупные компании. Никакая защита не смогла уберечь Mastercard от вторжения киберпреступников.',
            imgSrc: getRandomNewsPic(),
            channelLogoSrc: getRandomChannelLogo(),
            title: 'Афера века. Хакеры «ловят» сотрудников Mastercard, как на рыбалке',
            date: formatedDate, 
            fullDate: date,           
          },
          {
            contentInDetails:
              'Через фишинговые рассылки хакеры взломали сети банка, а через них — банкоматы, из которых унесли кругленькую сумму.',
            imgSrc: getRandomNewsPic(),
            channelLogoSrc: getRandomChannelLogo(),
            title:
              'Сотрудники Mastercard повелись на фишинг',
            date: formatedDate, 
            fullDate: date,           
          },
          {
            contentInDetails:
              'Кибератака прошла через фишинговую рассылку, замаскированную под рабочую переписку.',
            imgSrc: getRandomNewsPic(),
            channelLogoSrc: getRandomChannelLogo(),
            title: 'Хакеры взломали Mastercard',
            date: formatedDate, 
            fullDate: date,           
          },
    ],
    ExxonMobil: [
        {
            contentInDetails:
              'Киберпреступники взломали транспортную инфраструктуру и разрушили всю логистическую цепочку поставок.',
            imgSrc: getRandomNewsPic(),
            channelLogoSrc: getRandomChannelLogo(),
            title: 'Кибератака на ExxonMobil обернулась критическими финансовыми потерями для компании',
            date: formatedDate, 
            fullDate: date,           
          },
          {
            contentInDetails:
              'Хакерам удалось обойти защитную систему компании и создать хаос в распределительном центре.',
            imgSrc: getRandomNewsPic(),
            channelLogoSrc: getRandomChannelLogo(),
            title:
              'ExxonMobil задерживает грузы из-за кибератаки',
            date: formatedDate, 
            fullDate: date,           
          },
          {
            contentInDetails:
              'В ExxonMobil рассказали, что задержки связаны с кибератакой на транспортную инфраструктуру компании.',
            imgSrc: getRandomNewsPic(),
            channelLogoSrc: getRandomChannelLogo(),
            title: 'Грузы придут уже завтра',
            date: formatedDate, 
            fullDate: date,           
          },
    ],
    McDonald: [
        {
            contentInDetails:
              'Из-за кибератаки на компанию пришлось закрывать рестораны. McDonald’s подсчитывает миллионные убытки уже сейчас.',
            imgSrc: getRandomNewsPic(),
            channelLogoSrc: getRandomChannelLogo(),
            title: 'McDonald’s остался без прибыли',
            date: formatedDate, 
            fullDate: date,           
          },
          {
            contentInDetails:
              'Хакеры напали на логистические центры, чтобы разрушить цепочки поставок продукции. Компания временно закрывает свои рестораны.',
            imgSrc: getRandomNewsPic(),
            channelLogoSrc: getRandomChannelLogo(),
            title:
              'McDonald’s закрывает свои двери после кибератаки',
            date: formatedDate, 
            fullDate: date,           
          },
          {
            contentInDetails:
              'Хакеры взломали логистические центры компании. Продукция не доезжает до ресторанов.',
            imgSrc: getRandomNewsPic(),
            channelLogoSrc: getRandomChannelLogo(),
            title: 'На McDonald’s совершена кибератака',
            date: formatedDate, 
            fullDate: date,           
          },
    ],
  };
};

export default getTopCapitalizationNews_2;
