'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectDamgeLevel,
  selectIsAttacking,
  setDamageLevel,
} from '../../redux/features/generalSlice';
import {
  CRITICAL,
  CRITICAL_INFO,
  MINIMAL,
  MINIMAL__INFO,
  WARNING,
  WARNING__INFO,
} from '../../constants';
import { getLiClassnames } from '../../helpers/helpers_1';
import { infoActive, infoProtectMode, infoSelected } from '../../public/ui_kit';
import useManageModals_2 from '../../hooks/useManageModals_2';
import InfoModal from '../../common/Modals/InfoModal';

import styles from './SelectDamageModal.module.scss';

const SelectDamageModal = () => {
  const dispatch = useAppDispatch();
  const damageLevel = useAppSelector(selectDamgeLevel);
  const criticalSelected = damageLevel === CRITICAL;
  const minimalSelected = damageLevel === MINIMAL;
  const warningSelected = damageLevel === WARNING;
  const isAttacking = useAppSelector(selectIsAttacking);
  const liClassnames = {
    critical: getLiClassnames(damageLevel, isAttacking, CRITICAL, styles),
    minimal: getLiClassnames(damageLevel, isAttacking, MINIMAL, styles),
    warning: getLiClassnames(damageLevel, isAttacking, WARNING, styles),
  };
  const [openModal, setOpenModal] = useState(0);
  const [criticalOpen, setCriticalOpen] = useState(false);
  const [minimalOpen, setMinimalOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);

  useManageModals_2(openModal, setCriticalOpen, setMinimalOpen, setWarningOpen);

  const handleModals = (modalNum: number) => {
    if (openModal === modalNum) {
      setOpenModal(0);
    } else {
      setOpenModal(modalNum);
    }
    setTimeout(() => {
      setOpenModal(0);
    }, 3000);
  };

  const handleLevelClick = (level: string) => {
    dispatch(setDamageLevel(level));
  };

  return (
    <div className={styles.damageLevelTheGorge}>
      <h5>уровень ущерба</h5>
      <div className="TypoBodyBig" style={{ color: '#787878' }}>
        Для каждой задачи доступен выбор только одного уровня ущерба.
      </div>
      <ul className={styles.damageLevelTheGorgeList}>
        <li className={liClassnames.critical}>
          {criticalOpen && (
            <InfoModal
              infoName={CRITICAL_INFO}
              setModalClose={() => setOpenModal(0)}
            />
          )}
          <button
            className="SecondarySmall"
            onClick={() => handleLevelClick(CRITICAL)}
          >
            <span>
              <div className={styles.damageLevelTheGorgeListItem}>
                <Image
                  src={'onboarding/square.svg'}
                  alt={'square'}
                  width={20}
                  height={20}
                />

                <h4>критический</h4>
              </div>
              <button
                className={styles.infoBtn}
                onClick={(event) => {
                  event.stopPropagation();
                  handleModals(1);
                }}
              >
                <Image
                  src={
                    criticalOpen
                      ? infoActive
                      : isAttacking
                      ? criticalSelected
                        ? infoSelected
                        : 'onboarding/info.svg'
                      : criticalSelected
                      ? infoProtectMode
                      : 'onboarding/info.svg'
                  }
                  alt={'square'}
                  width={20}
                  height={20}
                />
              </button>
            </span>
          </button>
        </li>
        <li className={liClassnames.minimal}>
          {minimalOpen && (
            <InfoModal
              infoName={MINIMAL__INFO}
              setModalClose={() => setOpenModal(0)}
            />
          )}
          <button
            className="SecondarySmall"
            onClick={() => handleLevelClick(MINIMAL)}
          >
            <span>
              <div className={styles.damageLevelTheGorgeListItem}>
                <Image
                  src={'onboarding/squareMid.svg'}
                  alt={'square'}
                  width={20}
                  height={20}
                />

                <h4>минимальный</h4>
              </div>
              <button
                className={styles.infoBtn}
                onClick={(event) => {
                  event.stopPropagation();
                  handleModals(2);
                }}
              >
                <Image
                  src={
                    minimalOpen
                      ? infoActive
                      : isAttacking
                      ? minimalSelected
                        ? infoSelected
                        : 'onboarding/info.svg'
                      : minimalSelected
                      ? infoProtectMode
                      : 'onboarding/info.svg'
                  }
                  alt={'square'}
                  width={20}
                  height={20}
                />
              </button>
            </span>
          </button>
        </li>
        <li className={liClassnames.warning}>
          {warningOpen && (
            <InfoModal
              infoName={WARNING__INFO}
              setModalClose={() => setOpenModal(0)}
            />
          )}
          <button
            className="SecondarySmall"
            onClick={() => handleLevelClick(WARNING)}
          >
            <span>
              <div className={styles.damageLevelTheGorgeListItem}>
                <Image
                  src={'onboarding/squareLittle.svg'}
                  alt={'square'}
                  width={20}
                  height={20}
                />

                <h4>предупреждение</h4>
              </div>
              <button
                className={styles.infoBtn}
                onClick={(event) => {
                  event.stopPropagation();
                  handleModals(3);
                }}
              >
                <Image
                  src={
                    warningOpen
                      ? infoActive
                      : isAttacking
                      ? warningSelected
                        ? infoSelected
                        : 'onboarding/info.svg'
                      : warningSelected
                      ? infoProtectMode
                      : 'onboarding/info.svg'
                  }
                  alt={'square'}
                  width={20}
                  height={20}
                />
              </button>
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SelectDamageModal;
