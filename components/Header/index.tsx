import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  leftSquareBracket,
  leftSquareBracketBlue,
  lines,
  protectBlueTrash,
  rightSquareBracket,
  rightSquareBracketBlue,
  trash,
} from '../../public/summary';
import { IActionCardProps } from '../ActionCard';
import { ATTACK, PROTECTION, SUMMARY } from '../../constants';
import useGetPage from '../../hooks/useGetPage';
import { useAppDispatch } from '../../redux/hooks';
import { resetGeneralState, selectAttackTime } from '../../redux/features/generalSlice';
import TrashModal from '../../common/TrashModal';
import useCloseModal from '../../hooks/useCloseModal';
import { setResetMapIfChanged } from '../../redux/features/helpersSlice';

import styles from './Header.module.scss';
import { useSelector } from 'react-redux';

const Header = ({ action, setActionId, fromDetails }: IActionCardProps) => {
  const page = useGetPage();
  const router = useRouter();
  const dispatch = useAppDispatch();
  let trashCallBack = () => {};
  const [trashModalOpen, setTrashModalOpen] = useState(false);
  const closeModal = () => setTrashModalOpen(false);
  useCloseModal(trashModalOpen, setTrashModalOpen);
  const timeObject = useSelector(selectAttackTime);

  switch (page) {
    case SUMMARY:
      trashCallBack = () => {
        setTimeout(() => {
          dispatch(setResetMapIfChanged());
          dispatch(resetGeneralState());
        }, 10);

        router.back();
      };
      break;
  }

  if (!action) return;
  const { actionType, name, isCompleted, date, id } = action;

  const handleClick = () => {
    if (!setActionId) {
      return;
    }

    setActionId(fromDetails ? '' : String(id));
  };

  return (
    <header
      className={`${styles.header} ${setActionId ? styles.cursorPointer : ''}`}
      onClick={handleClick}
    >
      <div className={styles.leftPart}>
        <h2 className={styles.actionTitle}>
          {actionType === ATTACK ? 'Атака' : 'Защита'} {name}
        </h2>

        {isCompleted !== null && (
          <span
            className={`${styles.actionStatus} ${
              actionType === PROTECTION ? styles.protection : ''
            }`}
          >
            <Image
              src={
                actionType === PROTECTION
                  ? leftSquareBracketBlue
                  : leftSquareBracket
              }
              alt="leftSquareBracket"
              width={7}
              height={19}
              priority
            />
            {isCompleted ? `выполнена` : `отложенный запуск`}

            <Image
              src={
                actionType === PROTECTION
                  ? rightSquareBracketBlue
                  : rightSquareBracket
              }
              alt="rightSquareBracket"
              width={7}
              height={19}
              priority
            />
          </span>
        )}
      </div>

      <div className={styles.rightPart}>
        {isCompleted !== null && (
          <div
            className={`${styles.completingDate} ${
              actionType === PROTECTION ? styles.protection : ''
            }`}
          >
            {!isCompleted && (
              <>
                <Image
                  src={lines}
                  alt="lines"
                  width={56}
                  height={11}
                  priority
                />
                <span>будет выполнена</span>
              </>
            )}
            <span>{timeObject.date}</span>
            <span>в {timeObject.time}</span>
          </div>
        )}

        {!isCompleted && (
          <button
            onClick={() => setTrashModalOpen(true)}
            className={trashModalOpen ? styles.trashBtn : ''}
          >
            <Image
              src={actionType === PROTECTION ? protectBlueTrash : trash}
              alt="trash"
              width={23}
              height={23}
              priority
            />
          </button>
        )}
      </div>

      {trashModalOpen && (
        <TrashModal
          closeModal={closeModal}
          name="trashInSummary"
          trashCallBack={trashCallBack}
          trashModalOpen={trashModalOpen}
        />
      )}
    </header>
  );
};

export default Header;
