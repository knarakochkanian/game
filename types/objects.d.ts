declare module 'react-world-flags';
declare module 'socket.io-client';
declare module 'redux-logger';
// declare module '@/redux/store';

interface IOption {
  value: string;
  label: string;
}

interface IAction {
  actionType: string;
  news: INews[];
  launchConsequences: ILaunchConsequences;
  id: string;
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
}

interface IProtection extends IAction {}

interface ISectorOption {
  parent: string;
  id: string;
  name: string;
  selected: boolean;
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
}
