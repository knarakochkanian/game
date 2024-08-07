import {
  obrazovaniye,
  seti_svyazi,
  energetika,
  turizm,
  SMI,
  finansovaya_sistema,
  transportnaya_sistema,
  stroitelstvo,
  torgovlya,
  promyshlennost,
  kosmos,
  zdravookhraneniye,
  dobycha_polez_iskopayemykh,
  gos_infrastruktura,
  vooruzhennyye_sily,
  Vodosnabzheniye,
  APK,
  VPK,
  top_capitalization,
} from '../constants';

const industry: IIndustry = {
  id: 2,
  nameMain: 'Отрасль',
  sectors: [
    {
      id: 8,
      title: APK,
      options: [
        {
          selected: false,
          parent: APK,
          id: 1,
          name: 'Растениеводство',
          n: 0.8,
        },
        {
          selected: false,
          parent: APK,
          id: 2,
          name: 'Животноводство',
          n: 1,
        },
        {
          selected: false,
          parent: APK,
          id: 3,
          name: 'Рыболовство и рыбоводство',
          n: 0.2,
        },
        {
          selected: false,
          parent: APK,
          id: 4,
          name: 'Вино-водочная промышленность',
          n: 2,
        },
      ],
    },
    {
      id: 9,
      title: Vodosnabzheniye,
      options: [
        {
          selected: false,
          parent: Vodosnabzheniye,
          id: 1,
          name: 'Забор, очистка и распределение воды',
          n: 2,
        },
        {
          selected: false,
          parent: Vodosnabzheniye,
          id: 2,
          name: 'Распределение воды для питьевых и промышленных нужд',
          n: 2,
        },
      ],
    },
    {
      id: 10,
      title: vooruzhennyye_sily,
      options: [
        {
          selected: false,
          parent: vooruzhennyye_sily,
          id: 1,
          name: 'Мотострелковые войска',
          n: 0.2,
        },
        {
          selected: false,
          parent: vooruzhennyye_sily,
          id: 2,
          name: 'Танковые войска',
          n: 0.4,
        },
        {
          selected: false,
          parent: vooruzhennyye_sily,
          id: 3,
          name: 'Войсковая разведка',
          n: 0.1,
        },
        {
          selected: false,
          parent: vooruzhennyye_sily,
          id: 4,
          name: 'Ракетные войска и артиллерия',
          n: 1,
        },
        {
          selected: false,
          parent: vooruzhennyye_sily,
          id: 5,
          name: 'Войска ПВО Сухопутных войск',
          n: 1,
        },
        {
          selected: false,
          parent: vooruzhennyye_sily,
          id: 6,
          name: 'Специальные войска',
          n: 0.1,
        },
        {
          selected: false,
          parent: vooruzhennyye_sily,
          id: 7,
          name: 'Дальняя авиация',
          n: 2,
        },
        {
          selected: false,
          parent: vooruzhennyye_sily,
          id: 8,
          name: 'Фронтовая авиация',
          n: 1,
        },
        {
          selected: false,
          parent: vooruzhennyye_sily,
          id: 9,
          name: 'Армейская авиация',
          n: 2,
        },
        {
          selected: false,
          parent: vooruzhennyye_sily,
          id: 10,
          name: 'Военно-транспортная авиация',
          n: 3,
        },
        {
          selected: false,
          parent: vooruzhennyye_sily,
          id: 11,
          name: 'Специальная авиация',
          n: 0.5,
        },
        {
          selected: false,
          parent: vooruzhennyye_sily,
          id: 12,
          name: 'Зенитные ракетные войска',
          n: 0.5,
        },
        {
          selected: false,
          parent: vooruzhennyye_sily,
          id: 13,
          name: 'Радиотехнические войска',
          n: 4,
        },
        {
          selected: false,
          parent: vooruzhennyye_sily,
          id: 14,
          name: 'Комплексы ПРО',
          n: 1,
        },
        {
          selected: false,
          parent: vooruzhennyye_sily,
          id: 15,
          name: 'Комплексы ПВО',
          n: 1,
        },
        {
          selected: false,
          parent: vooruzhennyye_sily,
          id: 16,
          name: 'Радиолокационные станции',
          n: 2,
        },
        {
          selected: false,
          parent: vooruzhennyye_sily,
          id: 17,
          name: 'Космические войска',
          n: 6,
        },
        {
          selected: false,
          parent: vooruzhennyye_sily,
          id: 18,
          name: 'Подводные силы',
          n: 1,
        },
        {
          selected: false,
          parent: vooruzhennyye_sily,
          id: 19,
          name: 'Надводные силы',
          n: 1,
        },
        {
          selected: false,
          parent: vooruzhennyye_sily,
          id: 20,
          name: 'Морская авиация',
          n: 1,
        },
        {
          selected: false,
          parent: vooruzhennyye_sily,
          id: 21,
          name: 'Береговые войска',
          n: 1,
        },
        {
          selected: false,
          parent: vooruzhennyye_sily,
          id: 22,
          name: 'Морская пехота',
          n: 1,
        },
        {
          selected: false,
          parent: vooruzhennyye_sily,
          id: 23,
          name: 'Береговые ракетно-артиллерийские войска',
          n: 0.5,
        },
        {
          selected: false,
          parent: vooruzhennyye_sily,
          id: 24,
          name: 'Спецназ ВМФ',
          n: 0.2,
        },
        {
          selected: false,
          parent: vooruzhennyye_sily,
          id: 25,
          name: 'Ракетные армии',
          n: 2,
        },
        {
          selected: false,
          parent: vooruzhennyye_sily,
          id: 26,
          name: 'Полигоны РВСН',
          n: 1,
        },
        {
          selected: false,
          parent: vooruzhennyye_sily,
          id: 27,
          name: 'Космодромы РВСН',
          n: 4,
        },
        {
          selected: false,
          parent: vooruzhennyye_sily,
          id: 28,
          name: 'Авиация РВСН',
          n: 2,
        },
        {
          selected: false,
          parent: vooruzhennyye_sily,
          id: 29,
          name: 'Ракетные арсеналы РВСН',
          n: 2,
        },
        {
          selected: false,
          parent: vooruzhennyye_sily,
          id: 30,
          name: 'Инженерные части РВСН',
          n: 3,
        },
        {
          selected: false,
          parent: vooruzhennyye_sily,
          id: 31,
          name: 'Подразделения противодиверсионной борьбы РВСН',
          n: 3,
        },
        {
          selected: false,
          parent: vooruzhennyye_sily,
          id: 32,
          name: 'Воздушно-десантные войска',
          n: 1,
        },
      ],
    },
    {
      id: 11,
      title: VPK,
      options: [
        {
          selected: false,
          parent: VPK,
          id: 1,
          name: 'Организации-заказчики вооружений',
          n: 1,
        },
        {
          selected: false,
          parent: VPK,
          id: 2,
          name: 'Научно-исследовательские организации',
          n: 2,
        },
        {
          selected: false,
          parent: VPK,
          id: 3,
          name: 'Опытно-конструкторские организации',
          n: 1,
        },
        {
          selected: false,
          parent: VPK,
          id: 4,
          name: 'Производство ядерного оружия',
          n: 4,
        },
        {
          selected: false,
          parent: VPK,
          id: 5,
          name: 'Ракетно-космическая промышленность',
          n: 5,
        },
        {
          selected: false,
          parent: VPK,
          id: 6,
          name: 'Авиационная промышленность',
          n: 4,
        },
        {
          selected: false,
          parent: VPK,
          id: 7,
          name: 'Судостроительная промышленность',
          n: 2,
        },
        {
          selected: false,
          parent: VPK,
          id: 8,
          name: 'Бронетанковая промышленность',
          n: 1,
        },
        {
          selected: false,
          parent: VPK,
          id: 9,
          name: 'Производство стрелкового оружия и боеприпасов',
          n: 1,
        },
        {
          selected: false,
          parent: VPK,
          id: 10,
          name: 'Производство артиллерийского вооружения',
          n: 2,
        },
      ],
    },
    {
      id: 12,
      title: gos_infrastruktura,
      options: [
        {
          selected: false,
          parent: gos_infrastruktura,
          id: 1,
          name: 'Органы законодательной власти',
          n: 1,
        },
        {
          selected: false,
          parent: gos_infrastruktura,
          id: 2,
          name: 'Органы исполнительной власти',
          n: 2,
        },
        {
          selected: false,
          parent: gos_infrastruktura,
          id: 3,
          name: 'Органы судебной власти',
          n: 4,
        },
        {
          selected: false,
          parent: gos_infrastruktura,
          id: 4,
          name: 'Органы местного самоуправления',
          n: 2,
        },
      ],
    },
    {
      id: 13,
      title: dobycha_polez_iskopayemykh,
      options: [
        {
          selected: false,
          parent: dobycha_polez_iskopayemykh,
          id: 1,
          name: 'Добыча угля',
          n: 4,
        },
        {
          selected: false,
          parent: dobycha_polez_iskopayemykh,
          id: 2,
          name: 'Добыча нефти',
          n: 6,
        },
        {
          selected: false,
          parent: dobycha_polez_iskopayemykh,
          id: 3,
          name: 'Добыча газа',
          n: 6,
        },
        {
          selected: false,
          parent: dobycha_polez_iskopayemykh,
          id: 4,
          name: 'Добыча природного газа',
          n: 6,
        },
        {
          selected: false,
          parent: dobycha_polez_iskopayemykh,
          id: 5,
          name: 'Добыча и обогащение железных руд',
          n: 2,
        },
        {
          selected: false,
          parent: dobycha_polez_iskopayemykh,
          id: 6,
          name: 'Добыча руд цветных металлов',
          n: 2,
        },
        {
          selected: false,
          parent: dobycha_polez_iskopayemykh,
          id: 7,
          name: 'Добыча прочих полезных ископаемых',
          n: 3,
        },
      ],
    },
    {
      id: 14,
      title: zdravookhraneniye,
      options: [
        {
          selected: false,
          parent: zdravookhraneniye,
          id: 1,
          name: 'Больничные организации',
          n: 2,
        },
        {
          selected: false,
          parent: zdravookhraneniye,
          id: 2,
          name: 'Организации санитарно-эпидемиологической службы',
          n: 1,
        },
      ],
    },
    {
      id: 15,
      title: kosmos,
      options: [
        {
          selected: false,
          parent: kosmos,
          id: 1,
          name: 'Производители ракет-носителей',
          n: 8,
        },
        {
          selected: false,
          parent: kosmos,
          id: 2,
          name: 'Производители двигателей',
          n: 5,
        },
        {
          selected: false,
          parent: kosmos,
          id: 3,
          name: 'Поддержка пилотируемой космонавтики',
          n: 8,
        },
        {
          selected: false,
          parent: kosmos,
          id: 4,
          name: 'Разработчики спутников',
          n: 8,
        },
        {
          selected: false,
          parent: kosmos,
          id: 5,
          name: 'Частные производители космических аппаратов',
          n: 2,
        },
        {
          selected: false,
          parent: kosmos,
          id: 6,
          name: 'Частные производители ракет-носителей',
          n: 3,
        },
        {
          selected: false,
          parent: kosmos,
          id: 7,
          name: 'Частные производители посадочных модулей, планетоходов и орбитальных аппаратов',
          n: 3,
        },
        {
          selected: false,
          parent: kosmos,
          id: 8,
          name: 'Космодромы',
          n: 1,
        },
        {
          selected: false,
          parent: kosmos,
          id: 9,
          name: 'Ракеты-носители',
          n: 2,
        },
        {
          selected: false,
          parent: kosmos,
          id: 10,
          name: 'Здравоохранение',
          n: 2,
        },
        {
          selected: false,
          parent: kosmos,
          id: 11,
          name: 'Пилотируемые космические корабли',
          n: 6,
        },
        {
          selected: false,
          parent: kosmos,
          id: 12,
          name: 'Грузовые космические корабли',
          n: 6,
        },
        {
          selected: false,
          parent: kosmos,
          id: 13,
          name: 'Орбитальные группировки',
          n: 2,
        },
        {
          selected: false,
          parent: kosmos,
          id: 14,
          name: 'Космические станции',
          n: 12,
        },
      ],
    },
    {
      id: 16,
      title: obrazovaniye,
      options: [
        {
          selected: false,
          parent: obrazovaniye,
          id: 1,
          name: 'Образование дошкольное',
          n: 1,
        },
        {
          selected: false,
          parent: obrazovaniye,
          id: 2,
          name: 'Школьное образование',
          n: 1,
        },
        {
          selected: false,
          parent: obrazovaniye,
          id: 3,
          name: 'Профессиональное образование',
          n: 1,
        },
        {
          selected: false,
          parent: obrazovaniye,
          id: 4,
          name: 'Высшее образование',
          n: 1,
        },
        {
          selected: false,
          parent: obrazovaniye,
          id: 5,
          name: 'Дополнительное образование',
          n: 1,
        },
      ],
    },
    {
      id: 17,
      title: promyshlennost,
      options: [
        {
          selected: false,
          parent: promyshlennost,
          id: 1,
          name: 'Топливная промышленность',
          n: 4,
        },
        {
          selected: false,
          parent: promyshlennost,
          id: 2,
          name: 'Чёрная металлургия',
          n: 2,
        },
        {
          selected: false,
          parent: promyshlennost,
          id: 3,
          name: 'Цветная металлургия',
          n: 2,
        },
        {
          selected: false,
          parent: promyshlennost,
          id: 4,
          name: 'Химическая промышленность',
          n: 4,
        },
        {
          selected: false,
          parent: promyshlennost,
          id: 5,
          name: 'Нефтехимическая промышленность',
          n: 6,
        },
        {
          selected: false,
          parent: promyshlennost,
          id: 6,
          name: 'Машиностроение',
          n: 6,
        },
        {
          selected: false,
          parent: promyshlennost,
          id: 7,
          name: 'Металлообработка',
          n: 2,
        },
        {
          selected: false,
          parent: promyshlennost,
          id: 8,
          name: 'Лесная промышленность',
          n: 1,
        },
        {
          selected: false,
          parent: promyshlennost,
          id: 9,
          name: 'Деревообрабатывающая промышленность',
          n: 1,
        },
        {
          selected: false,
          parent: promyshlennost,
          id: 10,
          name: 'Целлюлозно-бумажная промышленность',
          n: 1,
        },
        {
          selected: false,
          parent: promyshlennost,
          id: 11,
          name: 'Промышленность строительных материалов',
          n: 1,
        },
        {
          selected: false,
          parent: promyshlennost,
          id: 12,
          name: 'Лёгкая промышленность',
          n: 1,
        },
        {
          selected: false,
          parent: promyshlennost,
          id: 13,
          name: 'Стекольная и фарфорофаянсовая промышленность',
          n: 1,
        },
        {
          selected: false,
          parent: promyshlennost,
          id: 14,
          name: 'Пищевая промышленность',
          n: 2,
        },
        {
          selected: false,
          parent: promyshlennost,
          id: 15,
          name: 'Микробиологическая промышленность',
          n: 2,
        },
        {
          selected: false,
          parent: promyshlennost,
          id: 16,
          name: 'Медицинская промышленность',
          n: 6,
        },
        {
          selected: false,
          parent: promyshlennost,
          id: 17,
          name: 'Информационные технологии',
          n: 6,
        },
      ],
    },
    {
      id: 18,
      title: seti_svyazi,
      options: [
        {
          selected: false,
          parent: seti_svyazi,
          id: 1,
          name: 'Телефония',
          n: 3,
        },
        {
          selected: false,
          parent: seti_svyazi,
          id: 2,
          name: 'Широкополосные сети',
          n: 4,
        },
        {
          selected: false,
          parent: seti_svyazi,
          id: 3,
          name: 'Сотовая связь',
          n: 4,
        },
        {
          selected: false,
          parent: seti_svyazi,
          id: 4,
          name: 'Электросвязь',
          n: 8,
        },
        {
          selected: false,
          parent: seti_svyazi,
          id: 5,
          name: 'Электронная почта',
          n: 2,
        },
        {
          selected: false,
          parent: seti_svyazi,
          id: 6,
          name: 'Поисковые системы',
          n: 1,
        },
        {
          selected: false,
          parent: seti_svyazi,
          id: 7,
          name: 'Социальные сети',
          n: 1,
        },
      ],
    },
    {
      id: 19,
      title: SMI,
      options: [
        {
          selected: false,
          parent: SMI,
          id: 1,
          name: 'Печатная пресса',
          n: 1,
        },
        {
          selected: false,
          parent: SMI,
          id: 2,
          name: 'Радио',
          n: 1,
        },
        {
          selected: false,
          parent: SMI,
          id: 3,
          name: 'Телевидение',
          n: 1,
        },
        {
          selected: false,
          parent: SMI,
          id: 4,
          name: 'Новостные агентства',
          n: 2,
        },
      ],
    },
    {
      id: 20,
      title: stroitelstvo,
      options: [
        {
          selected: false,
          parent: stroitelstvo,
          id: 1,
          name: 'Строительство зданий',
          n: 3,
        },
        {
          selected: false,
          parent: stroitelstvo,
          id: 2,
          name: 'Строительство инженерных сооружений',
          n: 2,
        },
        {
          selected: false,
          parent: stroitelstvo,
          id: 3,
          name: 'Строительство автомобильных и железных дорог',
          n: 2,
        },
        {
          selected: false,
          parent: stroitelstvo,
          id: 4,
          name: 'Строительство инженерных коммуникаций',
          n: 8,
        },
      ],
    },
    {
      id: 21,
      title: torgovlya,
      options: [
        {
          selected: false,
          parent: torgovlya,
          id: 1,
          name: 'Торговые сети',
          n: 4,
        },
        {
          selected: false,
          parent: torgovlya,
          id: 2,
          name: 'Электронная коммерция',
          n: 8,
        },
        {
          selected: false,
          parent: torgovlya,
          id: 3,
          name: 'Оптовая торговля промышленными товарами',
          n: 8,
        },
      ],
    },
    {
      id: 22,
      title: transportnaya_sistema,
      options: [
        {
          selected: false,
          parent: transportnaya_sistema,
          id: 1,
          name: 'Железнодорожный транспорт',
          n: 4,
        },
        {
          selected: false,
          parent: transportnaya_sistema,
          id: 2,
          name: 'Морской транспорт',
          n: 2,
        },
        {
          selected: false,
          parent: transportnaya_sistema,
          id: 3,
          name: 'Речной транспорт',
          n: 1,
        },
        {
          selected: false,
          parent: transportnaya_sistema,
          id: 4,
          name: 'Трубопроводный транспорт',
          n: 2,
        },
        {
          selected: false,
          parent: transportnaya_sistema,
          id: 5,
          name: 'Автомобильный транспорт',
          n: 1,
        },
        {
          selected: false,
          parent: transportnaya_sistema,
          id: 6,
          name: 'Воздушный транспорт',
          n: 1,
        },
        {
          selected: false,
          parent: transportnaya_sistema,
          id: 7,
          name: 'Промышленный транспорт',
          n: 1,
        },
        {
          selected: false,
          parent: transportnaya_sistema,
          id: 8,
          name: 'Общественный транспорт',
          n: 1,
        },
        {
          selected: false,
          parent: transportnaya_sistema,
          id: 9,
          name: 'Транспортные узлы',
          n: 1,
        },
        {
          selected: false,
          parent: transportnaya_sistema,
          id: 10,
          name: 'Транспортные коридоры',
          n: 1,
        },
      ],
    },
    {
      id: 23,
      title: turizm,
      options: [
        {
          selected: false,
          parent: turizm,
          id: 1,
          name: 'Гостиницы',
          n: 1,
        },
        {
          selected: false,
          parent: turizm,
          id: 2,
          name: 'Санатории',
          n: 1,
        },
      ],
    },
    {
      id: 24,
      title: finansovaya_sistema,
      options: [
        {
          selected: false,
          parent: finansovaya_sistema,
          id: 1,
          name: 'Банковская система',
          n: 8,
        },
        {
          selected: false,
          parent: finansovaya_sistema,
          id: 2,
          name: 'Платёжные системы и электронные деньги',
          n: 6,
        },
        {
          selected: false,
          parent: finansovaya_sistema,
          id: 3,
          name: 'Микрофинансовые организации и ломбарды',
          n: 6,
        },
        {
          selected: false,
          parent: finansovaya_sistema,
          id: 4,
          name: 'Пенсионные фонды',
          n: 2,
        },
        {
          selected: false,
          parent: finansovaya_sistema,
          id: 5,
          name: 'Страховой рынок',
          n: 4,
        },
        {
          selected: false,
          parent: finansovaya_sistema,
          id: 6,
          name: 'Актуарии',
          n: 2,
        },
        {
          selected: false,
          parent: finansovaya_sistema,
          id: 7,
          name: 'Фондовый рынок',
          n: 8,
        },
        {
          selected: false,
          parent: finansovaya_sistema,
          id: 8,
          name: 'Управляющие компании и инвестиционные фонды',
          n: 1,
        },
        {
          selected: false,
          parent: finansovaya_sistema,
          id: 9,
          name: 'Кооперативы в сфере финансового рынка',
          n: 1,
        },
        {
          selected: false,
          parent: finansovaya_sistema,
          id: 10,
          name: 'Инвестиционные платформы и операторы ЦФА',
          n: 3,
        },
        {
          selected: false,
          parent: finansovaya_sistema,
          id: 11,
          name: 'Бюро кредитных историй',
          n: 3,
        },
      ],
    },
    {
      id: 26,
      title: energetika,
      options: [
        {
          selected: false,
          parent: energetika,
          id: 1,
          name: 'Теплоэнергетика',
          n: 4,
        },
        {
          selected: false,
          parent: energetika,
          id: 2,
          name: 'Ядерная энергетика',
          n: 8,
        },
        {
          selected: false,
          parent: energetika,
          id: 3,
          name: 'Гидроэнергетика',
          n: 4,
        },
        {
          selected: false,
          parent: energetika,
          id: 4,
          name: 'Биоэнергетика',
          n: 5,
        },
        {
          selected: false,
          parent: energetika,
          id: 5,
          name: 'Геотермальная энергетика',
          n: 5,
        },
        {
          selected: false,
          parent: energetika,
          id: 6,
          name: 'Ветроэнергетика',
          n: 2,
        },
        {
          selected: false,
          parent: energetika,
          id: 7,
          name: 'Солнечная энергетика',
          n: 5,
        },
      ],
    },
    {
      id: 27,
      title: 'Топ капитализаций компаний',
      options: [
        {
          selected: false,
          parent: top_capitalization,
          id: 1,
          name: 'Google',
          src: '/top-capitalization/google.svg',
          capitalization: 2150000000000,
        },
        {
          selected: false,
          parent: top_capitalization,
          id: 2,
          name: 'Apple',
          src: '/top-capitalization/apple.svg',
          capitalization: 3331000000000,
        },
        {
          selected: false,
          parent: top_capitalization,
          id: 3,
          name: 'Microsoft',
          src: '/top-capitalization/microsoft.svg',
          capitalization: 3332000000000,
        },
        {
          selected: false,
          parent: top_capitalization,
          id: 4,
          name: 'Amazon.com',
          src: '/top-capitalization/amazon.svg',
          capitalization: 1970000000000,
        },
        {
          selected: false,
          parent: top_capitalization,
          id: 5,
          name: 'NVIDIA',
          src: '/top-capitalization/nvidia.svg',
          capitalization: 3251000000000,
        },
        {
          selected: false,
          parent: top_capitalization,
          id: 6,
          name: 'Meta',
          src: '/top-capitalization/meta.svg',
          capitalization: 1220000000000,
        },
        {
          selected: false,
          parent: top_capitalization,
          id: 7,
          name: 'Visa',
          src: '/top-capitalization/visa.svg',
          capitalization: 554000000000,
        },
        {
          selected: false,
          parent: top_capitalization,
          id: 8,
          name: 'Mastercard',
          src: '/top-capitalization/mastercard.svg',
          capitalization: 392000000000,
        },
        {
          selected: false,
          parent: top_capitalization,
          id: 9,
          name: 'Exxon Mobil',
          src: '/top-capitalization/exxon.svg',
          capitalization: 448000000000,
        },
        {
          selected: false,
          parent: top_capitalization,
          id: 10,
          name: 'McDonald’s',
          src: '/top-capitalization/McDonald’s.svg',
          capitalization: 173000000000,
        },
      ],
    },
  ],
};

interface ISectorOption {
  selected: boolean;
  parent: string;
  id: number;
  name: string;
}

interface ISector {
  id: number;
  title: string;
  options: ISectorOption[];
}

export const defaultSectorsSelection: ISector[] = [
  {
    id: 8,
    title: 'ВПК',
    options: [
      { selected: true, parent: 'VPK', id: 1, name: 'вооруженные силы' },
      { selected: false, parent: 'VPK', id: 2, name: 'конструкторсткие бюро' },
      { selected: false, parent: 'VPK', id: 3, name: 'НИИ' },
      { selected: false, parent: 'VPK', id: 4, name: 'Оборонное производство' },
      { selected: false, parent: 'VPK', id: 5, name: 'экспортеры воорудения' },
    ],
  },
];

export default industry;
