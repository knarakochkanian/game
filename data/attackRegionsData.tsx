interface Option {
  id: string;
  name: string;
}

interface RegionCategory {
  id: string;
  title?: string;
  options?: Option[];
}

export interface Region {
  id: number;
  nameMain: string;
  regions?: RegionCategory[];
  industry?: RegionCategory[];
  damage?: RegionCategory[];
}

export const regions: Region[] = [
  {
    id: 1,
    nameMain: 'Регион',
    regions: [
      {
        id: '1',
        title: 'наиболее вероятный выбор',
        options: [
          { id: 'G7', name: 'G7' },
          { id: 'НАТО', name: 'НАТО' },
          { id: 'США', name: 'США' },
          { id: 'ЕВРОСОЮЗ', name: 'ЕВРОСОЮЗ' },
          { id: 'ВЕСЬ МИР', name: 'ВЕСЬ МИР' },
        ],
      },
      {
        id: '2',
        title: 'недружественные страны',
        options: [],
      },
      {
        id: '3',
        title: 'военные блоки',
        options: [],
      },
      {
        id: '4',
        title: 'политичнские блоки',
        options: [],
      },
      {
        id: '5',
        title: 'континеты',
        options: [],
      },
      {
        id: '6',
        title: 'регионы',
        options: [],
      },
      {
        id: '7',
        title: 'страны',
        options: [],
      },
    ],
  },
  {
    id: 2,
    nameMain: 'Отрасль',
    regions: [
      {
        id: '1',
        title: 'ВПК',
        options: [
          { id: '01', name: 'вооруженные силы' },
          { id: '02', name: 'конструкторсткие бюро' },
          { id: '03', name: 'НИИ' },
          { id: '04', name: 'Оборонное производство' },
          { id: '05', name: 'экспортеры воорудения' },
        ],
      },
      {
        id: '2',
        title: 'гос. инфраструктура',
        options: [],
      },
      {
        id: '3',
        title: 'космос',
        options: [],
      },
      {
        id: '4',
        title: 'логистика и траспорт',
        options: [],
      },
      {
        id: '5',
        title: 'промышленность',
        options: [],
      },
      {
        id: '6',
        title: 'розничная торговля',
        options: [],
      },
      {
        id: '7',
        title: 'финансы',
        options: [],
      },
    ],
  },
  {
    id: 3,
    nameMain: 'Ущерб',
    regions: [
      {
        id: '1',
        title: 'Критический',
      },
      {
        id: '2',
        title: 'Минимальный',
      },
      {
        id: '3',
        title: 'Предупреждение',
      },
    ],
  },
];
