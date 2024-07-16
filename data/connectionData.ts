import { ISingleWave } from '../common/SingleWave';

export const simCards = [
  {
    operator: 'Мегафон',
    num: 1,
    isOn: true,
  },
  {
    operator: 'Tele2',
    num: 2,
    isOn: false,
  },
  {
    operator: 'Билайн',
    num: 3,
    isOn: true,
  },
  {
    operator: 'МТС',
    num: 4,
    isOn: false,
  },
];

export const waves: ISingleWave[] = [
  {
    isOn: true,
    network: 'Open VPN',
    num: 1,
  },
  {
    isOn: true,
    network: 'Wireguard',
    num: 2,
  },
];
