declare module 'react-world-flags';
declare module 'socket.io-client';

interface IOption {
  value: string;
  label: string;
}

interface IAction {
  launchConsequences: ILaunchConsequences;
  id: string;
  actionType: string;
  isCompleted: boolean;
  name: string;
  date: string;
  region: IOption;
  industry: IOption;
  damage: string;
}

interface IAttack extends IAction {
  news: INews[];
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
}

interface IProtection extends IAction {}
