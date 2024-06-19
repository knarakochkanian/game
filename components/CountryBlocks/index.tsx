import { MOST_LIKELY_CHOICE, RESET, SELECT_ALL } from '../../constants';
import { Option } from '../../data/attackRegionsData';
import {
  selectActiveBlocks,
  selectIsAttacking,
  selectPickedCountries,
  setActiveBlocks,
  setPlaceName,
} from '../../redux/features/generalSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import CountryBlockCard from '../CountryBlockCard';

interface ICountryBlocksProps {
  options: (Option | IPlace)[] | undefined;
}

const CountryBlocks = ({ options }: ICountryBlocksProps) => {
  return options?.map((option) => {
    return <CountryBlockCard key={option.id} option={option} />;
  });
};

export default CountryBlocks;
