interface IOption {
  value: string;
  label: string;
}

interface IAttack {
  news: INews[];
  launchConsequences: ILaunchConsequences;
  id: string;
  isCompleted: boolean;
  name: string;
  date: string;
  region: IOption;
  industry: IOption;
  damage: string;
}

interface INews {
  channelLogoSrc: string;
  title: string;
  content: string;
}
