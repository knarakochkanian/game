import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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
import {
  ACTIONS_IN_QUEUE,
  ATTACK,
  COMPLETED_ACTIONS,
  HISTORY,
  PROTECTION,
  QUEUE,
  SUMMARY,
} from '../../constants';
import useGetPage from '../../hooks/useGetPage';
import { useAppDispatch } from '../../redux/hooks';
import { resetGeneralState } from '../../redux/features/generalSlice';
import TrashModal from '../../common/TrashModal';
import useCloseModal from '../../hooks/useCloseModal';
import { setResetMapIfChanged, setUpdateHistoryOrQueue } from '../../redux/features/helpersSlice';
import { getItemFromStorage } from '../../helpers';

import styles from './Header.module.scss';

const Header = ({ action, setActionId, fromDetails }: IActionCardProps) => {
  const page = useGetPage();
  const router = useRouter();
  const dispatch = useAppDispatch();
  let trashCallBack = () => {};
  const [trashModalOpen, setTrashModalOpen] = useState(false);
  const closeModal = () => setTrashModalOpen(false);
  useCloseModal(trashModalOpen, setTrashModalOpen);

  const handleTrashCallBack = () => {
    let actions = '';
    setTrashModalOpen(false);

    setTimeout(() => {
      dispatch(setResetMapIfChanged());
      dispatch(resetGeneralState());
    }, 10);

    switch (page) {
      case SUMMARY: router.back();    
      case QUEUE:
        actions = ACTIONS_IN_QUEUE
      case HISTORY:
        actions = COMPLETED_ACTIONS
        break;
    }

    const storedActions = getItemFromStorage(actions, window);
    
    console.log('storedActions', storedActions);
    
    if (storedActions && Array.isArray(storedActions)) {
      const updatedActions = storedActions.filter(
        (storedAction) => storedAction.id !== action.id
      );

      console.log('updatedActions', updatedActions);
      
      localStorage.setItem(actions, JSON.stringify(updatedActions));
      dispatch(setUpdateHistoryOrQueue());
    }    
  };

  switch (page) {
    case SUMMARY:     
    case QUEUE:
    case HISTORY:
      trashCallBack = handleTrashCallBack;
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
      className={`${styles.header} ${
        actionType === ATTACK ? '' : styles.isProtecting
      } ${setActionId ? styles.cursorPointer : ''}`}
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
            <span>{date.split(' ')[0]}</span>
            <span>в {date.split(' ')[1]}</span>
          </div>
        )}

        {!trashModalOpen && (
          <button
            onClick={(event) => {
              event.stopPropagation();
              setTrashModalOpen(true);
            }}
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
