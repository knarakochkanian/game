declare module 'react-world-flags';
declare module 'socket.io-client';
declare module 'redux-logger';
declare module '@mui/x-date-pickers/AdapterDayjs';
declare module '@mui/x-date-pickers/LocalizationProvider';
declare module '@mui/x-date-pickers/DateTimePicker';
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

interface IAction {
  actionType: string;
  news: INews[];
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
  content: string;
  date?: string;
  minutes?: number;
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
  id: string;
  name: string;
  selected: boolean;
  src?: string;
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
  searchInputRef: RefObject<HTMLInputElement>;
  setLayoutName: TSetString;
  keyboardRef: TKeyboardRefFunc;
  layoutName: string;
  onChange: (input: string) => void;
  onKeyPress: (button: string) => void;
  setShowKeyboard: TSetBoolean;
}
