import { ISingleWave } from '../common/SingleWave';

export const simCards = [
  {
    operator: 'МТС',
    num: 1,
    isOn: true,
  },
  {
    operator: 'Мегафон',
    num: 2,
    isOn: false,
  },
  {
    operator: 'Билайн',
    num: 3,
    isOn: true,
  },
  {
    operator: 'Tele2',
    num: 4,
    isOn: false,
  },
];

export const waves: ISingleWave[] = [
  {
    ip: '95.163.17.10',
    isOn: true,
    network: 'Open VPN',
    num: 1,
  },
  {
    ip: '213.183.45.95',
    isOn: false,
    network: 'Wireguard',
    num: 2,
  },
];