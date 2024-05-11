export const CONNECTED = 'Подключена';
export const NOT_CONNECTED = 'Нет подключения';

export const NETWORK = 'Сеть';
export const WAVE_STATE = 'Состояние';
export const IP = 'IP';

export const ATTACK = 'атака';
export const PROTECTION = 'защита';
export const GLOBE = 'глобус';
export const MAP = 'карта';

//languages
export const ENGLISH = 'english';
export const RUSSIAN = 'russian';

//pages
export const ONBOARDING = 'onboarding';
export const HISTORY = 'history';
export const NEWS = 'news';
export const COUNT_DOWN = 'count-down';
export const QUEUE = 'queue';

export const pagesWhereDropdownDisabled = [ONBOARDING, HISTORY];
export const bottomLinesAreStraightPages = [NEWS, HISTORY];
export const pagesWithoutGrid = [NEWS];
export const pagesWithoutLocalTime = [COUNT_DOWN];
export const bottomLinesAreNarrowPages = [ONBOARDING];

//damage levels
export const CRITICAL = 'Критический';
export const MINIMAL = 'Минимальный';
export const WARNING = 'Предупреждение';

//oreders
export const CANCEL = 'ОТМЕНА';
export const START = 'ПУСК';

export const cancelAttackTitle = 'Для отмены атаки нажмите кнопку';
export const startAttackTitle = 'Для запуска атаки нажмите кнопку';

export const LAUNCH_CONSEQUENCES = 'launchConsequences';
export const consequencesParagraph =
  'Военно-промышленный подвергнется крупной DDoS-атаке: в атаке на 44 завода будет задействовано 104 000 хакеров, которые будут действовать с 30 000 устройств из-за рубежа, атакуя все сервисы и техпроцессы. Атака будет направлена на перегрузку брандмауэра, центральной сети или системы, распределяющей нагрузку.Оборонные производства столкнулся с нарушением процессов: замедлением/остановкой техпроцессов, а также процессов информирования, что приведет к тотальной дезинформации. В это же время будет происходить атака на телефонию обронного комплекса, и аварийных систем информирования сотрудников ВПК.Финансовые потери ВПК составят более 17 млрд долларов. ';

export const citiesUnderAttack = 'Будет затронуто  городов';
export const populationSuffering = 'Пострадает населения';
export const wholeDamage = 'Прогноз ущерба на сумму';

export const stateSystemOn =
  'Система подключена к защищенной сети. Возможно создание и пуск задачи.';
export const stateSystemOff =
  'Пуск задачи невозможен. Текущая задача будет сохранена и доступна к запуску, когда система подключится к защищенной сети.';
