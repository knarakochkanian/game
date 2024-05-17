export function getCountryOrStateNameByCode(code: string): string | undefined {
  for (const [key, value] of Object.entries(countriesNamesToCode)) {
    if (value === code) {
      return key;
    }
  }
}

export const countriesNamesToCode: Record<string, string> = {
  Австралия: 'AUS',
  Австрия: 'AUT',
  Азербайджан: 'AZE',
  'Аландские острова': 'ALD',
  Албания: 'ALB',
  Алжир: 'DZA',
  'Американское Самоа': 'ASM',
  Ангилья: 'AIA',
  Ангола: 'AGO',
  Андорра: 'AND',
  Антарктида: 'ATA',
  'Антигуа и Барбуда': 'ATG',
  Аргентина: 'ARG',
  Армения: 'ARM',
  Аруба: 'ABW',
  Афганистан: 'AFG',
  'Багамские Острова': 'BHS',
  Бангладеш: 'BGD',
  Барбадос: 'BRB',
  Бахрейн: 'BHR',
  Беларусь: 'BLR',
  Белиз: 'BLZ',
  Бельгия: 'BEL',
  Бенин: 'BEN',
  'Бермудские Острова': 'BMU',
  Болгария: 'BGR',
  Боливия: 'BOL',
  'Босния и Герцеговина': 'BIH',
  Ботсвана: 'BWA',
  Бразилия: 'BRA',
  'Британская территория в Индийском океане': 'IOT',
  Бруней: 'BRN',
  'Буркина-Фасо': 'BFA',
  Бурунди: 'BDI',
  Бутан: 'BTN',
  Вануату: 'VUT',
  Ватикан: 'VAT',
  Великобритания: 'GBR',
  Венгрия: 'HUN',
  Венесуэла: 'VEN',
  'Британские Виргинские острова': 'VGB',
  'Американские Виргинские острова': 'VIR',
  'Внешние малые острова США': 'UMI',
  'Тимор-Лесте': 'TLS',
  Вьетнам: 'VNM',
  Габон: 'GAB',
  Гаити: 'HTI',
  Гайана: 'GUY',
  Гамбия: 'GMB',
  Гана: 'GHA',
  Гватемала: 'GTM',
  Гвинея: 'GIN',
  'Гвинея-Бисау': 'GNB',
  Германия: 'DEU',
  Гернси: 'GGY',
  Гибралтар: 'GIB',
  Гондурас: 'HND',
  Гонконг: 'HKG',
  Палестина: 'PSX',
  Гренада: 'GRD',
  Гренландия: 'GRL',
  Греция: 'GRC',
  Грузия: 'GEO',
  Гуам: 'GUM',
  Дания: 'DNK',
  'Конго (Киншаса)': 'COD',
  Джерси: 'JEY',
  Джибути: 'DJI',
  Доминика: 'DMA',
  'Доминиканская Республика': 'DOM',
  Египет: 'EGY',
  Замбия: 'ZMB',
  Зимбабве: 'ZWE',
  Израиль: 'ISR',
  Индия: 'IND',
  Индонезия: 'IDN',
  Иордания: 'JOR',
  Ирак: 'IRQ',
  Иран: 'IRN',
  Ирландия: 'IRL',
  Исландия: 'ISL',
  Испания: 'ESP',
  Италия: 'ITA',
  Йемен: 'YEM',
  'Кабо-Верде': 'CPV',
  Казахстан: 'KAZ',
  Камбоджа: 'KHM',
  Камерун: 'CMR',
  Канада: 'CAN',
  Катар: 'QAT',
  Кения: 'KEN',
  Кипр: 'ESB',
  Киргизия: 'KGZ',
  Кирибати: 'KIR',
  'Северная Корея': 'PRK',
  Китай: 'CHN',
  Колумбия: 'COL',
  'Коморские острова': 'COM',
  Косово: 'KOS',
  'Коста-Рика': 'CRI',
  "Кот-д'Ивуар": 'CIV',
  Куба: 'USG',
  Кувейт: 'KWT',
  Кюрасао: 'CUW',
  Лаос: 'LAO',
  Латвия: 'LVA',
  Лесото: 'LSO',
  Либерия: 'LBR',
  Ливан: 'LBN',
  Ливия: 'LBY',
  Литва: 'LTU',
  Лихтенштейн: 'LIE',
  Люксембург: 'LUX',
  Маврикий: 'MUS',
  Мавритания: 'MRT',
  Мадагаскар: 'MDG',
  Макао: 'MAC',
  Малави: 'MWI',
  Малайзия: 'MYS',
  Мали: 'MLI',
  Мальдивы: 'MDV',
  Мальта: 'MLT',
  Марокко: 'MAR',
  'Маршалловы острова': 'MHL',
  Мексика: 'MEX',
  Микронезия: 'FSM',
  Мозамбик: 'MOZ',
  Молдавия: 'MDA',
  Монако: 'MCO',
  Монголия: 'MNG',
  Монтсеррат: 'MSR',
  Мьянма: 'MMR',
  Намибия: 'NAM',
  Науру: 'NRU',
  Непал: 'NPL',
  Нигер: 'NER',
  Нигерия: 'NGA',
  Нидерланды: 'NLD',
  Никарагуа: 'NIC',
  Ниуэ: 'NIU',
  'Новая Зеландия': 'NZL',
  'Новая Каледония': 'NCL',
  Норвегия: 'NOR',
  'Объединённые Арабские Эмираты': 'ARE',
  Оман: 'OMN',
  'Остров Мэн': 'IMN',
  'Остров Норфолк': 'NFK',
  'Каймановы острова': 'CYM',
  'Острова Кука': 'COK',
  'Острова Питкэрн': 'PCN',
  'Остров Святой Елены': 'SHN',
  Пакистан: 'PAK',
  Палау: 'PLW',
  Панама: 'PAN',
  'Папуа – Новая Гвинея': 'PNG',
  Парагвай: 'PRY',
  Перу: 'PER',
  Польша: 'POL',
  Португалия: 'PRT',
  'Пуэрто-Рико': 'PRI',
  'Конго (Браззавиль)': 'COG',
  'Южная Корея': 'KOR',
  Россия: 'RUS',
  Руанда: 'RWA',
  Румыния: 'ROU',
  САДР: 'SAH',
  Сальвадор: 'SLV',
  Самоа: 'WSM',
  'Сан-Марино': 'SMR',
  'Сан-Томе и Принсипи': 'STP',
  'Саудовская Аравия': 'SAU',
  Свазиленд: 'SWZ',
  Македония: 'MKD',
  'Северные Марианские острова': 'MNP',
  'Сейшельские Острова': 'SYC',
  'Сен-Бартельми': 'BLM',
  'Остров Святого Мартина (французская часть)': 'MAF',
  'Сен-Пьер и Микелон': 'SPM',
  Сенегал: 'SEN',
  'Сент-Винсент и Гренадины': 'VCT',
  'Сент-Китс и Невис': 'KNA',
  'Сент-Люсия': 'LCA',
  Сербия: 'SRB',
  Сингапур: 'SGP',
  'Синт-Мартен': 'SXM',
  Сирия: 'SYR',
  Словакия: 'SVK',
  Словения: 'SVN',
  'Соломоновы острова': 'SLB',
  Сомали: 'SOM',
  Судан: 'SDN',
  Суринам: 'SUR',
  США: 'USA',
  'Сьерра-Леоне': 'SLE',
  Таджикистан: 'TJK',
  Таиланд: 'THA',
  Тайвань: 'TWN',
  Танзания: 'TZA',
  'Тёркс и Кайкос': 'TCA',
  Того: 'TGO',
  Токелау: 'TKL',
  Тонга: 'TON',
  'Тринидад и Тобаго': 'TTO',
  Тувалу: 'TUV',
  Тунис: 'TUN',
  Туркмения: 'TKM',
  Турция: 'TUR',
  Уганда: 'UGA',
  Узбекистан: 'UZB',
  Украина: 'UKR',
  'Уоллис и Футуна': 'WLF',
  Уругвай: 'URY',
  'Фарерские острова': 'FRO',
  Фиджи: 'FJI',
  Филиппины: 'PHL',
  Финляндия: 'FIN',
  'Фолклендские острова': 'FLK',
  Франция: 'FRA',
  'Французская Полинезия': 'PYF',
  'Французские Южные и Антарктические территории': 'ATF',
  'Остров Херд и Острова Макдоналд': 'HMD',
  Хорватия: 'HRV',
  'Центральноафриканская Республика': 'CAF',
  Чад: 'TCD',
  Черногория: 'MNE',
  Чехия: 'CZE',
  Чили: 'CHL',
  Швейцария: 'CHE',
  Швеция: 'SWE',
  'Шри-Ланка': 'LKA',
  Эквадор: 'ECU',
  'Экваториальная Гвинея': 'GNQ',
  Эритрея: 'ERI',
  Эстония: 'EST',
  Эфиопия: 'ETH',
  ЮАР: 'ZAF',
  'Южная Георгия и Южные Сандвичевы острова': 'SGS',
  // "Южный Судан": "SDS",
  Ямайка: 'JAM',
  Япония: 'JPN',

  // заполненные вручную
  'Южный Судан': 'SSD',
  'Западная Сахара': 'ESH',
  'Французская Гвиана': 'GUF',
  Мартиника: 'MTQ',
  Гваделупа: 'GLP',
  Реюньон: 'REU',

  // USA regions
  Айдахо: 'US.ID',
  Айова: 'US.IA',
  Алабама: 'US.AL',
  Аляска: 'US.AK',
  Аризона: 'US.AZ',
  Арканзас: 'US.AR',
  Вайоминг: 'US.WY',
  Вашингтон: 'US.WA',
  'Вашингтон (округ Колумбия)': 'US.DC',
  Вермонт: 'US.VT',
  Виргиния: 'US.VA',
  Висконсин: 'US.WI',
  Гавайи: 'US.HI',
  Делавэр: 'US.DE',
  Джорджия: 'US.GA',
  'Западная Виргиния': 'US.WV',
  Иллинойс: 'US.IL',
  Индиана: 'US.IN',
  Калифорния: 'US.CA',
  Канзас: 'US.KS',
  Кентукки: 'US.KY',
  Колорадо: 'US.CO',
  Коннектикут: 'US.CT',
  Луизиана: 'US.LA',
  Массачусетс: 'US.MA',
  Миннесота: 'US.MN',
  Миссисипи: 'US.MS',
  Миссури: 'US.MO',
  Мичиган: 'US.MI',
  Монтана: 'US.MT',
  Мэн: 'US.ME',
  Мэриленд: 'US.MD',
  Небраска: 'US.NE',
  Невада: 'US.NV',
  'Нью-Гэмпшир': 'US.NH',
  'Нью-Джерси': 'US.NJ',
  'Нью-Йорк': 'US.NY',
  'Нью-Мексико': 'US.NM',
  Огайо: 'US.OH',
  Оклахома: 'US.OK',
  Орегон: 'US.OR',
  Пенсильвания: 'US.PA',
  'Род-Айленд': 'US.RI',
  'Северная Дакота': 'US.ND',
  'Северная Каролина': 'US.NC',
  Теннесси: 'US.TN',
  Техас: 'US.TX',
  Флорида: 'US.FL',
  'Южная Дакота': 'US.SD',
  'Южная Каролина': 'US.SC',
  Юта: 'US.UT',
};
