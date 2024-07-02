import { ConsequenceLevels, TopCapitalizationLevels } from '.';
import { top_capitalization } from '../../constants';
import { proccessIndustryName, proccessParagraphByDamageLevel } from '../../helpers/helpers_2';

type TTopCapitalParagraphsProps = {
  consequence: ConsequenceLevels | TopCapitalizationLevels;
  damageLevel: string;
  action: IAction;
};

const TopCapitalParagraphs = ({
  action,
  consequence,
  damageLevel,
}: TTopCapitalParagraphsProps) => {
  const topCapitalSector = action.industrySectors.find(
    (s) => s.title === top_capitalization
  );
  const selectedTopSectorNames = topCapitalSector?.options
    .filter((o) => o.selected)
    .map((o) => o.name);

  return selectedTopSectorNames?.map((name, i) => {
    const proccessedName = proccessIndustryName(name);
    const topConsequance = (consequence as TopCapitalizationLevels)[proccessedName];
   
    let paragraph = proccessParagraphByDamageLevel(damageLevel, topConsequance);

    return (
      <div key={i}>
        <p>{paragraph}</p>
      </div>
    );
  });
};

export default TopCapitalParagraphs;
