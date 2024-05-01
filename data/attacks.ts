import { CRITICAL, MINIMAL, WARNING } from '../constants';
import regionOptionsUSA from './USAdropdown';
import industryOptions from './industryOptions';
import launchConsequences from './launchConsequences';
import {
  industryOption_1,
  industryOption_2,
  industryOption_3,
} from './launchHistoryIndustryOptions';
import {
  regionOption_1,
  regionOption_2,
  regionOption_3,
} from './launchHistoryRegionOptions';
import news from './news';

export const attackExample = {
  news: news,
  launchConsequences: launchConsequences,
  id: '4',
  damage: CRITICAL,
  date: '03.02.2024 20:13',
  industry: industryOptions[0],
  isCompleted: false,
  name: '000-001',
  region: regionOptionsUSA[0],
};

const attacks: IAttack[] = [
  {
    news: news,
    launchConsequences: launchConsequences,
    id: '3',
    damage: CRITICAL,
    date: '23.02.2024 12:30',
    industry: industryOption_1,
    isCompleted: true,
    name: '000-003',
    region: regionOption_1,
  },
  {
    launchConsequences: launchConsequences,
    id: '2',
    damage: MINIMAL,
    date: '23.02.2024 11:45',
    industry: industryOption_2,
    isCompleted: true,
    name: '000-002',
    news: news,
    region: regionOption_2,
  },
  {
    launchConsequences: launchConsequences,
    id: '1',
    damage: WARNING,
    date: '22.02.2024 21:48',
    industry: industryOption_3,
    isCompleted: true,
    name: '000-001',
    news: news,
    region: regionOption_3,
  },
];

export default attacks;
