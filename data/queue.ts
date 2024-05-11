import { ATTACK, CRITICAL, PROTECTION } from '../constants';
import launchConsequences from './launchConsequences';
import {
  industryOption_1,
  industryOption_2,
} from './launchHistoryIndustryOptions';
import { regionOption_1, regionOption_2 } from './launchHistoryRegionOptions';

const queue: (IAttack | IProtection)[] = [
  {
    actionType: ATTACK,
    launchConsequences: launchConsequences,
    id: '3',
    damage: CRITICAL,
    date: '23.02.2024 12:30',
    industry: industryOption_1,
    isCompleted: false,
    name: '000-002',
    region: regionOption_1,
  },
  {
    actionType: PROTECTION,
    launchConsequences: launchConsequences,
    id: '4',
    damage: CRITICAL,
    date: '23.02.2024 12:30',
    industry: industryOption_2,
    isCompleted: false,
    name: '000-001',
    region: regionOption_2,
  },
];

export default queue;
