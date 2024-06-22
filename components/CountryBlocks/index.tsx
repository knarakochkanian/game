import { Option } from '../../data/attackRegionsData';
import useManageBlocksActiveStatus from '../../hooks/useManageBlocksActiveStatus';
import CountryBlockCard from '../CountryBlockCard';

interface ICountryBlocksProps {
  options: (Option | IPlace)[] | undefined;
}

const CountryBlocks = ({ options }: ICountryBlocksProps) => {
  useManageBlocksActiveStatus();

  return options?.map((option) => {
    return <CountryBlockCard key={option.id} option={option} />;
  });
};

export default CountryBlocks;
