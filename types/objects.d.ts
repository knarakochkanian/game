declare module 'react-world-flags';
declare module 'socket.io-client';
declare module 'redux-logger';
declare module '@mui/x-date-pickers/AdapterDayjs';
declare module '@mui/x-date-pickers/LocalizationProvider';
declare module '@mui/x-date-pickers/DateTimePicker';
declare module '@next/font/local';
// declare module '@/redux/store';

type TMap = {
  ref: MutableRefObject<null>;
  setCountryColor: MutableRefObject<
    ((name: string | string[], color?: string | undefined) => void) | undefined
  >;
  onRotateEnd: MutableRefObject<>;
  resetColors: MutableRefObject<(() => void) | undefined>;
  resetContours: MutableRefObject<(() => void) | undefined>;
};

interface IOption {
  value: string;
  label: string;
}

interface ILaunchConsequences {
  citiesUnderAttack: string;
  populationSuffering?: string;
  wholeDamage: string;
}

interface IAction {
  actionType: string;
  news: INews[];
  pickedCountries: string[];
  launchConsequences: ILaunchConsequences;
  id: number;
  damageLevel: string;
  date: string;
  industrySectors: ISector[];
  isCompleted: boolean | null;
  name: string;
  selectedCountries: IPlace[];
}

interface INews {
  contentInDetails?: string;
  imgSrc?: string;
  channelLogoSrc: string;
  title: string;
  date?: string;
  fullDate: string;
}

interface IPlace {
  id: number;
  name: string;
  regions?: IPlace[];
  code?: string;
  isSelected: boolean;
  population?: number;
  settlements?: number;
}

interface IProtection extends IAction {}

interface ISectorOption {
  parent: string;
  id: number;
  name: string;
  selected: boolean;
  src?: string;
  n?: number;
  capitalization?: number;
}

interface ISector {
  id: number;
  title: string;
  options: ISectorOption[];
}

interface IIndustry {
  id: number;
  nameMain: string;
  sectors: ISector[];
  n?: number;
}

type TLayout = {
  firstRow: string[];
  secondRow: string[];
  thirdRow: string[];
};

type TRef = MutableRefObject<{
  setSearchInput: (input: string) => void;
} | null>;

interface IKeyboardManagementProps {
  layoutInputProps: ILayoutInputProps;
  searchInputRef: RefObject<HTMLInputElement>;
  setLayoutName: TSetString;
  keyboardRef: TKeyboardRefFunc;
  layoutName: string;
  onChange: (input: string) => void;
  onKeyPress: (button: string) => void;
  setShowKeyboard: TSetBoolean;
}

interface ILayoutInputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  cursorPosition: number;
  setCursorPosition: React.Dispatch<React.SetStateAction<number>>;
}
