export const CONNECTED = 'Подключена';
export const NOT_CONNECTED = 'Нет подключения';

export const NETWORK = 'Сеть';
export const WAVE_STATE = 'Состояние';
export const IP = 'IP';

export const ATTACK = 'атака';
export const A_TTACK = 'Атака';
export const PROTECTION = 'защита';
export const P_ROTECTION = 'Защита';
export const ATTACK_OR_PROTECT = 'attackOrProtect';

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
export const SUMMARY = 'summary';

export const pagesWhereDropdownDisabled = [ONBOARDING, HISTORY, QUEUE];
export const bottomLinesAreStraightPages = [NEWS, HISTORY];
export const pagesWithoutGrid = [NEWS];
export const pagesWithoutLocalTime = [COUNT_DOWN];
export const bottomLinesAreNarrowPages = [ONBOARDING];

export const REGION_MODAL = 'REGION_MODAL';
export const DAMAGE_LEVEL_MODAL = 'DAMAGE_LEVEL_MODAL';
export const INDUSTRY_MODAL = 'INDUSTRY_MODAL';

//damage levels
export const CRITICAL = 'Критический';
export const MINIMAL = 'Минимальный';
export const WARNING = 'Предупреждение';

//local storage data
export const ACTIONS_IN_QUEUE = 'actionsInQueue';
export const COMPLETED_ACTIONS = 'completedActions';
export const LAST_ACTION_NAME = 'lastActionName';

//actions
export const RESET = 'RESET';
export const SELECT_ALL = 'SELECT_ALL';

//oreders
export const CANCEL = 'ОТМЕНА';
export const START = 'ПУСК';

////regions options
export const REGIONS = 'регионы';
export const COUNTRIES = 'страны';
export const MOST_LIKELY_CHOICE = 'наиболее вероятный выбор';
export const NOT_FRIENDLY_COUNTRIES = 'недружественные страны';

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

//sector names
export const obrazovaniye = 'образование';
export const seti_svyazi = 'сети связи';
export const energetika = 'энергетика';
export const turizm = 'туризм';
export const SMI = 'СМИ';
export const finansovaya_sistema = 'финансовая система';
export const transportnaya_sistema = 'транспортная система';
export const stroitelstvo = 'строительство';
export const torgovlya = 'торговля';
export const promyshlennost = 'промышленность';
export const kosmos = 'космос';
export const zdravookhraneniye = 'здравоохранение';
export const dobycha_polez_iskopayemykh = 'добыча полезных ископаемых';
export const gos_infrastruktura = 'государственная инфраструктура';
export const vooruzhennyye_sily = 'вооруженные силы';
export const Vodosnabzheniye = 'водоснабжение';
export const APK = 'АПК';
export const VPK = 'ВПК';
export const COMPANY_TOP_CAPITALIZATION = 'Топ капитализаций компаний';

//keyboard state
export const SHIFT = 'SHIFT';
export const DEFAULT = 'DEFAULT';

//keyboard button names
export const SHIFT_NAME = '{shift}';
export const BACKSPACE_NAME = '{bksp}';
export const SPACE_NAME = '{space}';
