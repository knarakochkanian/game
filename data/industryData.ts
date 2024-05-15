import {
  ENERGY,
  FINANCE,
  GOV_INFOSTRUCTURES,
  INDUSTRY,
  IT_SECTOR,
  LOG_AND_TRANSPORT,
  RETAIL,
  UNIVERSE,
  VPK,
} from '../constants';

const industry: IIndustry = {
  id: 2,
  nameMain: 'Отрасль',
  sectors: [
    {
      id: 8,
      title: 'ВПК',
      options: [
        { selected: false, parent: VPK, id: '01', name: 'вооруженные силы' },
        {
          selected: false,
          parent: VPK,
          id: '02',
          name: 'конструкторсткие бюро',
        },
        { selected: false, parent: VPK, id: '03', name: 'НИИ' },
        {
          selected: false,
          parent: VPK,
          id: '04',
          name: 'Оборонное производство',
        },
        {
          selected: false,
          parent: VPK,
          id: '05',
          name: 'экспортеры воорудения',
        },
      ],
    },
    {
      id: 9,
      title: 'гос. инфраструктура',
      options: [
        {
          selected: false,
          parent: GOV_INFOSTRUCTURES,
          id: '01',
          name: 'Законодательные органы',
        },
        {
          selected: false,
          parent: GOV_INFOSTRUCTURES,
          id: '02',
          name: 'здравоохранение',
        },
        {
          selected: false,
          parent: GOV_INFOSTRUCTURES,
          id: '03',
          name: 'правоохранительные органы',
        },
        { selected: false, parent: GOV_INFOSTRUCTURES, id: '04', name: 'суды' },
        {
          selected: false,
          parent: GOV_INFOSTRUCTURES,
          id: '05',
          name: 'учебные заведения',
        },
      ],
    },
    {
      id: 10,
      title: 'космос',
      options: [
        {
          selected: false,
          parent: UNIVERSE,
          id: '01',
          name: 'Двигателестроение',
        },
        { selected: false, parent: UNIVERSE, id: '02', name: 'Космодромы' },
        { selected: false, parent: UNIVERSE, id: '03', name: 'НИИ' },
        {
          selected: false,
          parent: UNIVERSE,
          id: '04',
          name: 'Пилотируемая космонавтика',
        },
        {
          selected: false,
          parent: UNIVERSE,
          id: '05',
          name: 'Пр-во ракета-носителей',
        },
        {
          selected: false,
          parent: UNIVERSE,
          id: '06',
          name: 'разработка спутников',
        },
        {
          selected: false,
          parent: UNIVERSE,
          id: '07',
          name: 'центр управления полетами',
        },
      ],
    },
    {
      id: 11,
      title: 'логистика и траспорт',
      options: [
        {
          selected: false,
          parent: LOG_AND_TRANSPORT,
          id: '01',
          name: 'Авиаперевозки',
        },
        {
          selected: false,
          parent: LOG_AND_TRANSPORT,
          id: '02',
          name: 'Автогрузоперевозки',
        },
        {
          selected: false,
          parent: LOG_AND_TRANSPORT,
          id: '03',
          name: 'Ж/Д перевозки',
        },
        {
          selected: false,
          parent: LOG_AND_TRANSPORT,
          id: '04',
          name: 'Морские грузоперевозки',
        },
        {
          selected: false,
          parent: LOG_AND_TRANSPORT,
          id: '05',
          name: 'Таможенная служба',
        },
      ],
    },
    {
      id: 12,
      title: 'промышленность',
      options: [
        { selected: false, parent: INDUSTRY, id: '01', name: 'Горная' },
        {
          selected: false,
          parent: INDUSTRY,
          id: '02',
          name: 'Деревообрабатывающая',
        },
        { selected: false, parent: INDUSTRY, id: '03', name: 'Легкая' },
        { selected: false, parent: INDUSTRY, id: '04', name: 'Лесная' },
        { selected: false, parent: INDUSTRY, id: '05', name: 'Машиностроение' },
        {
          selected: false,
          parent: INDUSTRY,
          id: '06',
          name: 'Металлообработка',
        },
        { selected: false, parent: INDUSTRY, id: '07', name: 'Металлургия' },
        { selected: false, parent: INDUSTRY, id: '08', name: 'Строительная' },
        { selected: false, parent: INDUSTRY, id: '09', name: 'Топливная' },
        { selected: false, parent: INDUSTRY, id: '10', name: 'Пищевая' },
        { selected: false, parent: INDUSTRY, id: '11', name: 'Химическая' },
      ],
    },
    {
      id: 13,
      title: 'розничная торговля',
      options: [
        { selected: false, parent: RETAIL, id: '01', name: 'Дистанционная' },
        {
          selected: false,
          parent: RETAIL,
          id: '02',
          name: 'Интернет-торговля',
        },
        { selected: false, parent: RETAIL, id: '03', name: 'Не стационарная' },
        { selected: false, parent: RETAIL, id: '04', name: 'Стационарная' },
      ],
    },
    {
      id: 14,
      title: 'финансы',
      options: [
        { selected: false, parent: FINANCE, id: '01', name: 'Банки' },
        { selected: false, parent: FINANCE, id: '02', name: 'Биржи' },
        {
          selected: false,
          parent: FINANCE,
          id: '03',
          name: 'Инвестиционные трасты',
        },
        {
          selected: false,
          parent: FINANCE,
          id: '04',
          name: 'Страховые компании',
        },
      ],
    },
    {
      id: 15,
      title: 'энергетика',
      options: [
        { selected: false, parent: ENERGY, id: '01', name: 'Биоэнергетика' },
        { selected: false, parent: ENERGY, id: '02', name: 'Ветроэнергетика' },
        { selected: false, parent: ENERGY, id: '03', name: 'Водородная' },
        { selected: false, parent: ENERGY, id: '04', name: 'Геотермальная' },
        { selected: false, parent: ENERGY, id: '05', name: 'Гидроэнергетика' },
        { selected: false, parent: ENERGY, id: '06', name: 'Солнечная' },
        { selected: false, parent: ENERGY, id: '07', name: 'Тепловая' },
        { selected: false, parent: ENERGY, id: '08', name: 'Термоядерная' },
        {
          selected: false,
          parent: ENERGY,
          id: '09',
          name: 'Электрические сети',
        },
        { selected: false, parent: ENERGY, id: '10', name: 'Ядерная' },
      ],
    },
    {
      id: 16,
      title: 'IT-сектор',
      options: [
        { selected: false, parent: IT_SECTOR, id: '01', name: 'Анализ данных' },
        { selected: false, parent: IT_SECTOR, id: '02', name: 'Автоматизация' },
        {
          selected: false,
          parent: IT_SECTOR,
          id: '03',
          name: 'Кибербезопасность',
        },
        {
          selected: false,
          parent: IT_SECTOR,
          id: '04',
          name: 'Облачные технологии',
        },
        {
          selected: false,
          parent: IT_SECTOR,
          id: '05',
          name: 'Производство оборудования',
        },
        { selected: false, parent: IT_SECTOR, id: '06', name: 'Разработка ПО' },
        { selected: false, parent: IT_SECTOR, id: '07', name: 'IT-услуги' },
      ],
    },
  ],
};

export default industry;
