import blocks from './blocks';
import countriesWithCodes, { RegionsInMain } from './countriesWithCodes';

export interface Option {
  id: number | string;
  name: string;
  members?: string[];
  selected?: boolean;
}

export interface IPlace extends Option {
  members?: string[];
}

export interface RegionCategory {
  id: number;
  title?: string;
  options?: (Option | IPlace)[];
  optionsForProtection?: (Option | IPlace)[];
  event?: string | null;
}

export interface Region {
  id: number;
  nameMain: string;
  regions?: RegionCategory[];
  industry?: RegionCategory[];
  damage?: RegionCategory[];
}

const {
  G7,
  european_union,
  nato,
  wholeWorld,
  USA,
  Belarus,
  ODKB,
  Russia,
  SNG,
} = blocks;

export const regions: Region[] = [
  {
    id: 1,
    nameMain: 'Регион',
    regions: [
      {
        id: 1,
        title: 'наиболее вероятный выбор',
        options: [
          { id: 'G7', name: 'G7', members: G7 },
          { id: 'НАТО', name: 'НАТО', members: nato },
          { id: 'США', name: 'США', members: USA },
          { id: 'ЕВРОСОЮЗ', name: 'ЕВРОСОЮЗ', members: european_union },
          //{ id: 'ВЕСЬ МИР', name: 'ВЕСЬ МИР', members: wholeWorld },
        ],
        optionsForProtection: [
          { id: 'РОССИЯ', name: 'РОССИЯ', members: Russia },
          { id: 'БЕЛОРУССИЯ', name: 'БЕЛОРУССИЯ', members: Belarus },
          { id: 'СНГ', name: 'СНГ', members: SNG },
          { id: 'ОДКБ', name: 'ОДКБ', members: ODKB },
          //{ id: 'ВЕСЬ МИР', name: 'ВЕСЬ МИР', members: wholeWorld },
        ],
      },
      {
        id: 2,
        title: 'недружественные страны',
        options: [
          { id: '1', name: 'Австралия' },
          { id: '2', name: 'Албания' },
          { id: '3', name: 'Андорра' },
          { id: '4', name: 'Багамские Острова' },
          { id: '5', name: 'Великобритания' },
          { id: '6', name: 'Исландия' },
          { id: '7', name: 'Канада' },
          { id: '8', name: 'Лихтенштейн' },
          { id: '9', name: 'Микронезия' },
          { id: '10', name: 'Монако' },
          { id: '11', name: 'Новая Зеландия' },
          { id: '12', name: 'Норвегия' },
          { id: '13', name: 'Республика Корея' },
          { id: '14', name: 'Сан-Марино' },
          { id: '15', name: 'Северная Македония' },
          { id: '16', name: 'Сингапур' },
          { id: '17', name: 'США' },
          { id: '18', name: 'Тайвань' },
          { id: '19', name: 'Украина' },
          { id: '20', name: 'Черногория' },
          { id: '21', name: 'Швейцария' },
          { id: '22', name: 'Япония' },
          { id: '23', name: 'Австрия' },
          { id: '24', name: 'Бельгия' },
          { id: '25', name: 'Болгария' },
          { id: '26', name: 'Венгрия' },
          { id: '27', name: 'Германия' },
          { id: '28', name: 'Греция' },
          { id: '29', name: 'Дания' },
          { id: '30', name: 'Ирландия' },
          { id: '31', name: 'Испания' },
          { id: '32', name: 'Италия' },
          { id: '33', name: 'Республика Кипр' },
          { id: '34', name: 'Латвия' },
          { id: '35', name: 'Литва' },
          { id: '36', name: 'Люксембург' },
          { id: '37', name: 'Мальта' },
          { id: '38', name: 'Нидерланды' },
          { id: '39', name: 'Польша' },
          { id: '40', name: 'Португалия' },
          { id: '41', name: 'Румыния' },
          { id: '42', name: 'Словакия' },
          { id: '43', name: 'Словения' },
          { id: '44', name: 'Финляндия' },
          { id: '45', name: 'Франция' },
          { id: '46', name: 'Хорватия' },
          { id: '47', name: 'Чехия' },
          { id: '48', name: 'Швеция' },
          { id: '49', name: 'Эстония' },
        ],
      },
      {
        id: 3,
        title: 'военные блоки',
        options: [
          {
            id: '1',
            name: 'ЛЮБЛИНСКИЙ ТРЕУГОЛЬНИК',
            members: ['Литва', 'Польша', 'Украина'],
          },
          {
            id: '2',
            name: 'ОДКБ',
            members: [
              'Армения',
              'Белоруссия',
              'Казахстан',
              'Кыргызстан',
              'Россия',
              'Таджикистан',
            ],
          },
          {
            id: '3',
            name: 'АНЗЮС',
            members: ['Австралия', 'Новая Зеландия', 'США'],
          },
          {
            id: '4',
            name: 'НОРДЕФКО',
            members: ['Дания', 'Финляндия', 'Исландия', 'Норвегия', 'Швеция'],
          },
          {
            id: '5',
            name: 'НАТО',
            members: [
              'Албания',
              'Бельгия',
              'Болгария',
              'Великобритания',
              'Венгрия',
              'Германия',
              'Греция',
              'Дания',
              'Исландия',
              'Испания',
              'Италия',
              'Канада',
              'Латвия',
              'Литва',
              'Люксембург',
              'Нидерланды',
              'Норвегия',
              'Польша',
              'Португалия',
              'Румыния',
              'Северная Македония',
              'Словакия',
              'Словения',
              'США',
              'Турция',
              'Франция',
              'Финляндия',
              'Хорватия',
              'Черногория',
              'Чехия',
              'Швеция',
              'Эстония',
            ],
          },
          {
            id: '6',
            name: 'РСО',
            members: [
              'Антигуа и Барбуда',
              'Барбадос',
              'Доминика',
              'Гренада',
              'Сент-Китс и Невис',
              'Сент-Люсия',
              'Сент-Винсент и Гренадины',
            ],
          },
          {
            id: '7',
            name: 'FDPA',
            members: [
              'Австралия',
              'Малазия',
              'Новая Зеландия',
              'Сингапур',
              'Великобритания',
            ],
          },
        ],
      },
      {
        id: 4,
        title: 'политические блоки',
        options: [
          {
            id: '1',
            name: 'G7',
            members: [
              'Франция',
              'Германия',
              'Италия',
              'Япония',
              'Великобритания',
              'США',
              'Канада',
            ],
          },
          {
            id: '2',
            name: 'G20',
            members: [
              'Аргентина',
              'Австралия',
              'Бразилия',
              'Германия',
              'Индия',
              'Индонезия',
              'Италия',
              'Канада',
              'Китай',
              'Великобритания',
              'Мексика',
              'Россия',
              'США',
              'Турция',
              'Франция',
              'Южная Корея',
              'ЮАР',
              'Япония',
              'Саудовская Аравия',
              'Европейский союз',
              'Африканский союз',
            ],
          },
          {
            id: '3',
            name: 'АСЕАН',
            members: [
              'Бруней',
              'Вьетнам',
              'Индонезия',
              'Камбоджа',
              'Лаос',
              'Малайзия',
              'Мьянма',
              'Сингапур',
              'Таиланд',
              'Филиппины',
            ],
          },
          {
            id: '4',
            name: 'АТЭС',
            members: [
              'Австралия',
              'Бруней',
              'Канада',
              'Индонезия',
              'Япония',
              'Республика Корея',
              'Малайзия',
              'Новая Зеландия',
              'Филиппины',
              'Сингапур',
              'Таиланд',
              'США',
              'Тайвань',
              'Гонконг',
              'Китай',
              'Мексика',
              'Папуа — Новая Гвинея',
              'Чили',
              'Перу',
              'Россия',
              'Вьетнам',
            ],
          },
          {
            id: '5',
            name: 'Евросоюз',
            members: [
              'Австрия',
              'Бельгия',
              'Болгария',
              'Венгрия',
              'Германия',
              'Греция',
              'Дания',
              'Ирландия',
              'Испания',
              'Италия',
              'Республика Кипр',
              'Латвия',
              'Литва',
              'Люксембург',
              'Мальта',
              'Нидерланды',
              'Польша',
              'Португалия',
              'Румыния',
              'Словакия',
              'Словения',
              'Финляндия',
              'Франция',
              'Хорватия',
              'Чехия',
              'Швеция',
              'Эстония',
            ],
          },
          {
            id: '6',
            name: 'КАРИКОМ',
            members: [
              'Антигуа и Барбуда',
              'Багамские Острова',
              'Барбадос',
              'Белиз',
              'Гаити',
              'Гайана',
              'Гренада',
              'Доминика',
              'Монтсеррат',
              'Сент-Винсент и Гренадины',
              'Сент-Китс и Невис',
              'Сент-Люсия',
              'Суринам',
              'Тринидад и Тобаго',
              'Ямайка',
            ],
          },
          {
            id: '7',
            name: 'ЕАЭС',
            members: [
              'Армения',
              'Белоруссия',
              'Казахстан',
              'Кыргызстан',
              'Россия',
            ],
          },
          {
            id: '8',
            name: 'ОЧЭС',
            members: [
              'Азербайджан',
              'Албания',
              'Армения',
              'Болгария',
              'Греция',
              'Грузия',
              'Молдавия',
              'Россия',
              'Румыния',
              'Сербия',
              'Северная Македония',
              'Турция',
              'Украина',
            ],
          },
          {
            id: '9',
            name: 'САДК',
            members: [
              'Ангола',
              'Ботсвана',
              'Коморы',
              'ДР Конго',
              'Эсватини',
              'Лесото',
              'Мадагаскар',
              'Малави',
              'Маврикий',
              'Мозамбик',
              'Намибия',
              'Сейшельские Острова',
              'ЮАР',
              'Танзания',
              'Замбия',
              'Зимбабве',
            ],
          },
          {
            id: '10',
            name: 'Содружество наций',
            members: [
              'Австралия',
              'Антигуа и Барбуда',
              'Багамские Острова',
              'Бангладеш',
              'Барбадос',
              'Белиз',
              'Ботсвана',
              'Бруней',
              'Вануату',
              'Великобритания',
              'Габон',
              'Гайана',
              'Гамбия',
              'Гана',
              'Гренада',
              'Доминика',
              'Замбия',
              'Индия',
              'Камерун',
              'Канада',
              'Кипр',
              'Кения',
              'Кирибати',
              'Лесото',
              'Маврикий',
              'Малави',
              'Малайзия',
              'Мальдивы',
              'Мальта',
              'Мозамбик',
              'Намибия',
              'Науру',
              'Нигерия',
              'Новая Зеландия',
              'Пакистан',
              'Папуа — Новая Гвинея',
              'Руанда',
              'Самоа',
              'Сейшельские Острова',
              'Сент-Винсент и Гренадины',
              'Сент-Китс и Невис',
              'Сент-Люсия',
              'Сингапур',
              'Соломоновы Острова',
              'Сьерра-Леоне',
              'Танзания',
              'Того',
              'Тонга',
              'Тринидад и Тобаго',
              'Тувалу',
              'Уганда',
              'Фиджи',
              'Шри-Ланка',
              'Эсватини',
              'Южно-Африканская Республика',
              'Ямайка',
            ],
          },
          {
            id: '11',
            name: 'СААРК',
            members: [
              'Индия',
              'Непал',
              'Бутан',
              'Шри-Ланка',
              'Мальдивы',
              'Бангладеш',
              'Пакистан',
              'Афганистан',
            ],
          },
          {
            id: '12',
            name: 'СГБМ',
            members: [
              'Германия',
              'Дания',
              'Исландия',
              'Латвия',
              'Литва',
              'Норвегия',
              'Польша',
              'Финляндия',
              'Швеция',
              'Эстония',
            ],
          },
        ],
      },
      {
        id: 5,
        title: 'континенты',
        options: [
          {
            id: '1',
            name: 'ЕВРАЗИЯ',
            members: [
              'Азербайджан',
              'Албания',
              'Андорра',
              'Армения',
              'Афганистан',
              'Австрия',
              'Беларусь',
              'Бельгия',
              'Бангладеш',
              'Бахрейн',
              'Бруней',
              'Болгария',
              'Босния и Герцеговина',
              'Бутан',
              'Ватикан',
              'Великобритания',
              'Венгрия',
              'Вьетнам',
              'Германия',
              'Греция',
              'Грузия',
              'Дания',
              'Израиль',
              'Индия',
              'Индонезия',
              'Иордания',
              'Ирак',
              'Иран',
              'Ирландия',
              'Исландия',
              'Испания',
              'Италия',
              'Йемен',
              'Казахстан',
              'Камбоджа',
              'Катар',
              'Кипр',
              'Киргизия',
              'Китай',
              'Северная Корея',
              'Кувейт',
              'Тайвань',
              'Лаос',
              'Латвия',
              'Ливан',
              'Литва',
              'Лихтенштейн',
              'Люксембург',
              'Малайзия',
              'Мальдивы',
              'Мальта',
              'Монголия',
              'Мьянма',
              'Молдова',
              'Монако',
              'Непал',
              'Нидерланды',
              'Норвегия',
              'Объединённые Арабские Эмираты',
              'Оман',
              'Пакистан',
              'Палестина',
              'Польша',
              'Португалия',
              'Румыния',
              'Россия',
              'Сан-Марино',
              'Саудовская Аравия',
              'Македония',
              'Молдавия',
              'Сербия',
              'Сингапур',
              'Сирия',
              'Словакия',
              'Словения',
              'Таджикистан',
              'Таиланд',
              'Туркмения',
              'Турция',
              'Украина',
              'Узбекистан',
              'Финляндия',
              'Франция',
              'Филиппины',
              'Хорватия',
              'Черногория',
              'Чехия',
              'Швейцария',
              'Швеция',
              'Шри-Ланка',
              'Эстония',
              'Южная Корея',
              'Япония',
            ],
          },
          {
            id: '2',
            name: 'АФРИКА',
            members: [
              'Алжир',
              'Ангола',
              'Бенин',
              'Ботсвана',
              'Буркина-Фасо',
              'Бурунди',
              'Габон',
              'Гамбия',
              'Гана',
              'Гвинея',
              'Гвинея-Бисау',
              'Джибути',
              'Египет',
              'Замбия',
              'Зимбабве',
              'Кабо-Верде',
              'Камерун',
              'Кения',
              'Коморские Острова',
              'Конго, Демократическая Республика',
              'Конго, Республика',
              'Центральноафриканская Республика',
              'Конго (Киншаса)',
              "Кот-д'Ивуар",
              'Лесото',
              'Либерия',
              'Ливия',
              'Маврикий',
              'Мавритания',
              'Мадагаскар',
              'Малави',
              'Мали',
              'Марокко',
              'Мозамбик',
              'Намибия',
              'Нигер',
              'Нигерия',
              'Руанда',
              'Сан-Томе и Принсипи',
              'Свазиленд',
              'Сейшельские Острова',
              'Сенегал',
              'Сомали',
              'Судан',
              'Сьерра-Леоне',
              'Танзания',
              'Того',
              'Тунис',
              'Уганда',
              'Центрально-Африканская Республика',
              'Чад',
              'Экваториальная Гвинея',
              'Эритрея',
              'Эсватини',
              'Эфиопия',
              'Южная Африка',
              'Южный Судан',
              'ЮАР',
              'Конго (Браззавиль)',
              'Западная Сахара',
            ],
          },
          {
            id: '3',
            name: 'СЕВЕРНАЯ АМЕРИКА',
            members: [
              'Антигуа и Барбуда',
              'Багамы',
              'Барбадос',
              'Белиз',
              'Гаити',
              'Гондурас',
              'Гватемала',
              'Гренада',
              'Доминика',
              'Доминиканская Республика',
              'Канада',
              'Коста-Рика',
              'Куба',
              'Мексика',
              'Никарагуа',
              'Панама',
              'Сальвадор',
              'Сент-Китс и Невис',
              'Сент-Люсия',
              'Сент-Винсент и Гренадины',
              'США',
              'Ямайка',
            ],
          },
          {
            id: '4',
            name: 'ЮЖНАЯ АМЕРИКА',
            members: [
              'Аргентина',
              'Боливия',
              'Бразилия',
              'Венесуэла',
              'Гайана',
              'Колумбия',
              'Парагвай',
              'Перу',
              'Суринам',
              'Уругвай',
              'Чили',
              'Эквадор',
              'Французская Гвиана',
            ],
          },
          {
            id: '5',
            name: 'АВСТРАЛИЯ',
            members: [
              'Австралия',
              'Науру',
              'Новая Зеландия',
              'Палау',
              'Папуа – Новая Гвинея',
              'Самоа',
              'Соломоновы Острова',
              'Тонга',
              'Тувалу',
              'Фиджи',
              'Шри-Ланка',
            ],
          },
        ],
      },
      {
        id: 6,
        title: 'регионы',
        options: RegionsInMain,
      },
      {
        id: 7,
        title: 'страны',
        options: countriesWithCodes,
      },
    ],
  },
  {
    id: 2,
    nameMain: 'Отрасль',
    regions: [
      {
        id: 8,
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
        id: 9,
        title: 'гос. инфраструктура',
        options: [],
      },
      {
        id: 10,
        title: 'космос',
        options: [],
      },
      {
        id: 11,
        title: 'логистика и траспорт',
        options: [],
      },
      {
        id: 12,
        title: 'промышленность',
        options: [],
      },
      {
        id: 13,
        title: 'розничная торговля',
        options: [],
      },
      {
        id: 14,
        title: 'финансы',
        options: [],
      },
      {
        id: 15,
        title: 'энергетика',
        options: [],
      },
      {
        id: 15,
        title: 'IT-сектор',
        options: [],
      },
    ],
  },
  {
    id: 3,
    nameMain: 'Ущерб',
  },
];

export const notFriendlyCountries = [
  { id: '1', name: 'Австралия' },
  { id: '2', name: 'Албания' },
  { id: '3', name: 'Андорра' },
  { id: '4', name: 'Багамские Острова' },
  { id: '5', name: 'Великобритания' },
  { id: '6', name: 'Исландия' },
  { id: '7', name: 'Канада' },
  { id: '8', name: 'Лихтенштейн' },
  { id: '9', name: 'Микронезия' },
  { id: '10', name: 'Монако' },
  { id: '11', name: 'Новая Зеландия' },
  { id: '12', name: 'Норвегия' },
  { id: '13', name: 'Республика Корея' },
  { id: '14', name: 'Сан-Марино' },
  { id: '15', name: 'Северная Македония' },
  { id: '16', name: 'Сингапур' },
  { id: '17', name: 'США' },
  { id: '18', name: 'Тайвань' },
  { id: '19', name: 'Украина' },
  { id: '20', name: 'Черногория' },
  { id: '21', name: 'Швейцария' },
  { id: '22', name: 'Япония' },
  { id: '23', name: 'Австрия' },
  { id: '24', name: 'Бельгия' },
  { id: '25', name: 'Болгария' },
  { id: '26', name: 'Венгрия' },
  { id: '27', name: 'Германия' },
  { id: '28', name: 'Греция' },
  { id: '29', name: 'Дания' },
  { id: '30', name: 'Ирландия' },
  { id: '31', name: 'Испания' },
  { id: '32', name: 'Италия' },
  { id: '33', name: 'Республика Кипр' },
  { id: '34', name: 'Латвия' },
  { id: '35', name: 'Литва' },
  { id: '36', name: 'Люксембург' },
  { id: '37', name: 'Мальта' },
  { id: '38', name: 'Нидерланды' },
  { id: '39', name: 'Польша' },
  { id: '40', name: 'Португалия' },
  { id: '41', name: 'Румыния' },
  { id: '42', name: 'Словакия' },
  { id: '43', name: 'Словения' },
  { id: '44', name: 'Финляндия' },
  { id: '45', name: 'Франция' },
  { id: '46', name: 'Хорватия' },
  { id: '47', name: 'Чехия' },
  { id: '48', name: 'Швеция' },
  { id: '49', name: 'Эстония' },
].map((place) => place.name);
