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

const industry = {
  id: 2,
  nameMain: 'Отрасль',
  sectors: [
    {
      id: 8,
      title: 'ВПК',
      options: [
        { parent: VPK, id: '01', name: 'вооруженные силы' },
        { parent: VPK, id: '02', name: 'конструкторсткие бюро' },
        { parent: VPK, id: '03', name: 'НИИ' },
        { parent: VPK, id: '04', name: 'Оборонное производство' },
        { parent: VPK, id: '05', name: 'экспортеры воорудения' },
      ],
    },
    {
      id: 9,
      title: 'гос. инфраструктура',
      options: [
        {
          parent: GOV_INFOSTRUCTURES,
          id: '01',
          name: 'Законодательные органы',
        },
        { parent: GOV_INFOSTRUCTURES, id: '02', name: 'здравоохранение' },
        {
          parent: GOV_INFOSTRUCTURES,
          id: '03',
          name: 'правоохранительные органы',
        },
        { parent: GOV_INFOSTRUCTURES, id: '04', name: 'суды' },
        { parent: GOV_INFOSTRUCTURES, id: '05', name: 'учебные заведения' },
      ],
    },
    {
      id: 10,
      title: 'космос',
      options: [
        { parent: UNIVERSE, id: '01', name: 'Двигателестроение' },
        { parent: UNIVERSE, id: '02', name: 'Космодромы' },
        { parent: UNIVERSE, id: '03', name: 'НИИ' },
        { parent: UNIVERSE, id: '04', name: 'Пилотируемая космонавтика' },
        { parent: UNIVERSE, id: '05', name: 'Пр-во ракета-носителей' },
        { parent: UNIVERSE, id: '06', name: 'разработка спутников' },
        { parent: UNIVERSE, id: '07', name: 'центр управления полетами' },
      ],
    },
    {
      id: 11,
      title: 'логистика и траспорт',
      options: [
        { parent: LOG_AND_TRANSPORT, id: '01', name: 'Авиаперевозки' },
        { parent: LOG_AND_TRANSPORT, id: '02', name: 'Автогрузоперевозки' },
        { parent: LOG_AND_TRANSPORT, id: '03', name: 'Ж/Д перевозки' },
        { parent: LOG_AND_TRANSPORT, id: '04', name: 'Морские грузоперевозки' },
        { parent: LOG_AND_TRANSPORT, id: '05', name: 'Таможенная служба' },
      ],
    },
    {
      id: 12,
      title: 'промышленность',
      options: [
        { parent: INDUSTRY, id: '01', name: 'Горная' },
        { parent: INDUSTRY, id: '02', name: 'Деревообрабатывающая' },
        { parent: INDUSTRY, id: '03', name: 'Легкая' },
        { parent: INDUSTRY, id: '04', name: 'Лесная' },
        { parent: INDUSTRY, id: '05', name: 'Машиностроение' },
        { parent: INDUSTRY, id: '06', name: 'Металлообработка' },
        { parent: INDUSTRY, id: '07', name: 'Металлургия' },
        { parent: INDUSTRY, id: '08', name: 'Строительная' },
        { parent: INDUSTRY, id: '09', name: 'Топливная' },
        { parent: INDUSTRY, id: '10', name: 'Пищевая' },
        { parent: INDUSTRY, id: '11', name: 'Химическая' },
      ],
    },
    {
      id: 13,
      title: 'розничная торговля',
      options: [
        { parent: RETAIL, id: '01', name: 'Дистанционная' },
        { parent: RETAIL, id: '02', name: 'Интернет-торговля' },
        { parent: RETAIL, id: '03', name: 'Не стационарная' },
        { parent: RETAIL, id: '04', name: 'Стационарная' },
      ],
    },
    {
      id: 14,
      title: 'финансы',
      options: [
        { parent: FINANCE, id: '01', name: 'Банки' },
        { parent: FINANCE, id: '02', name: 'Биржи' },
        { parent: FINANCE, id: '03', name: 'Инвестиционные трасты' },
        { parent: FINANCE, id: '04', name: 'Страховые компании' },
      ],
    },
    {
      id: 15,
      title: 'энергетика',
      options: [
        { parent: ENERGY, id: '01', name: 'Биоэнергетика' },
        { parent: ENERGY, id: '02', name: 'Ветроэнергетика' },
        { parent: ENERGY, id: '03', name: 'Водородная' },
        { parent: ENERGY, id: '04', name: 'Геотермальная' },
        { parent: ENERGY, id: '05', name: 'Гидроэнергетика' },
        { parent: ENERGY, id: '06', name: 'Солнечная' },
        { parent: ENERGY, id: '07', name: 'Тепловая' },
        { parent: ENERGY, id: '08', name: 'Термоядерная' },
        { parent: ENERGY, id: '09', name: 'Электрические сети' },
        { parent: ENERGY, id: '10', name: 'Ядерная' },
      ],
    },
    {
      id: 15,
      title: 'IT-сектор',
      options: [
        { parent: IT_SECTOR, id: '01', name: 'Анализ данных' },
        { parent: IT_SECTOR, id: '02', name: 'Автоматизация' },
        { parent: IT_SECTOR, id: '03', name: 'Кибербезопасность' },
        { parent: IT_SECTOR, id: '04', name: 'Облачные технологии' },
        { parent: IT_SECTOR, id: '05', name: 'Производство оборудования' },
        { parent: IT_SECTOR, id: '06', name: 'Разработка ПО' },
        { parent: IT_SECTOR, id: '07', name: 'IT-услуги' },
      ],
    },
  ],
};

export default industry;
