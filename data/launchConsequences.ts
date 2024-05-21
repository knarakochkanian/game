import { setTotalPopulationRegions } from '../redux/features/generalSlice';

export interface ILaunchConsequences {
  citiesUnderAttack: number;
  populationSuffering?: number;
  wholeDamage: number;
}

const launchConsequences: ILaunchConsequences = {
  citiesUnderAttack: 20,
  populationSuffering: 20,
  wholeDamage: 12,
};

export default launchConsequences;
