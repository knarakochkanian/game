const industryNames = [
  { name: 'АПК', nameInEnglish: 'APK' },
  {
    name: 'Водоснабжение',
    nameInEnglish: 'WATER_SUPPLY',
  },
  {
    name: 'Вооруженные силы',
    nameInEnglish: 'ARMED_FORCES',
  },
  {
    name: 'ВПК',
    nameInEnglish: 'VPK',
  },
  {
    name: 'Государственная инфраструктура',
    nameInEnglish: 'GOS_INFRASTRUCTURES',
  },
  {
    name: 'Добыча полезных ископаемых',
    nameInEnglish: 'MINING',
  },
  {
    name: 'Здравоохранение',
    nameInEnglish: 'HEALTHCARE',
  },
  {
    name: 'Космос',
    nameInEnglish: 'SPACE',
  },
  {
    name: 'Образование',
    nameInEnglish: 'EDUCATION',
  },  
  {
    name: 'Промышленность',
    nameInEnglish: 'INDUSTRY',
  },  
  {
    name: 'Сети связи',
    nameInEnglish: 'NETWORK_COMUNICATION',
  }, 
  {
    name: 'СМИ',
    nameInEnglish: 'SMI',
  }, 
  {
    name: 'Строительство',
    nameInEnglish: 'CONSTRUCTION',
  }, 
  {
    name: 'Торговля',
    nameInEnglish: 'TRADE',
  }, 
  {
    name: 'Транспортная система',
    nameInEnglish: 'TRANSPORT_SYSTEM',
  }, 
  {
    name: 'Туризм',
    nameInEnglish: 'TOURISM',
  },
  {
    name: 'Финансовая система',
    nameInEnglish: 'FINANCE_SYSTEM',
  },
  {
    name: 'Энергетика',
    nameInEnglish: 'ENERGY',
  },
  {
    name: 'Топ капитализаций компаний',
    nameInEnglish: 'COMPANY_TOP_CAPITALIZATION',
  },  
];

const getIndustryNameInEnglish = (nameInRussian: string) => {
  return industryNames.find(
    (industryName) => industryName.name === nameInRussian
  )?.nameInEnglish;
};

export default getIndustryNameInEnglish;
