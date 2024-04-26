'use client';

import { useState } from 'react';
import Image from 'next/image';
import { noiseMap } from '../../public/summary';
import ModalData from '../../common/ModalData';
import "../../app/globals.scss";

import {
  LAUNCH_CONSEQUENCES,
  citiesUnderAttack,
  populationSuffering,
  wholeDamage,
} from '../../constants';
import { ILaunchConsequences } from '../../data/launchConsequences';

import styles from './LaunchConsequences.module.scss';
import { formatNumber } from '../../helpers';
import Modal from "../../common/Modals/Modal";

const LaunchConsequences = ({
  launchConsequences,
}: {
  launchConsequences: ILaunchConsequences;
}) => {
  const [paragraphIsOpen, setparagraphIsOpen] = useState(false);

  return (
    <div className={styles.launchConsequences}>
      <div className={styles.info}>
        <h3 className={styles.title}>Последствия запуска</h3>
        <p>
          Военно-промышленный подвергнется крупной DDoS-атаке: в атаке на 44
          завода будет задействовано 104 000 хакеров, которые будут д...
        </p>
        <div className={styles.dataContainer}>
          <ModalData
            from={LAUNCH_CONSEQUENCES}
            name={citiesUnderAttack}
            value={String(launchConsequences.citiesUnderAttack)}
          />
          <ModalData
            from={LAUNCH_CONSEQUENCES}
            name={populationSuffering}
            value={formatNumber(String(launchConsequences.populationSuffering))}
          />
          <ModalData
            from={LAUNCH_CONSEQUENCES}
            name={wholeDamage}
            value={String(launchConsequences.wholeDamage) + ' млн $'}
          />
        </div>
      </div>
      <div style={{marginTop: "200px"}}>
        <Modal isOpen={true} counter={10}>
          <p> В данном окне отображается информация об уроне, который будет нанесен выбранным вами регионам, а также о последствиях атаки.</p>
          <div className="ModalButtons">
            <button className="ModalButton1" >далее</button>
            <button className="SecondarySmall"><span>пропустить</span></button>
          </div>
        </Modal>
        <Image src={noiseMap} alt="noiseMap" width={1048} height={542} priority />
      </div>

    </div>
  );
};

export default LaunchConsequences;
