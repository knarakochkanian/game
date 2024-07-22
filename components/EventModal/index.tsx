import eventOptions from '../../data/eventOptions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectIsAttacking,
  setIndustryEvent,
} from '../../redux/features/generalSlice';

import styles from './EventModal.module.scss';

interface IEventModalProps {
  industryName: string;
  eventName: string;
}

const EventModal = ({ industryName, eventName }: IEventModalProps) => {
  const dispatch = useAppDispatch();
  const isAttacking = useAppSelector(selectIsAttacking);

  const handleSelectEvent = (event: string) => {
    if (eventName === event) {
      dispatch(setIndustryEvent({ eventName: null, industryName }));
    } else {
      dispatch(setIndustryEvent({ eventName: event, industryName }));
    }
  };

  return (
    <dialog className={styles.eventModal}>
      <header className={styles.header}>
        <span
          className={isAttacking ? styles.attackSpan : styles.protectSpan}
        ></span>
        <h2>событие</h2>
        <p>
          Можно выбрать только одно <br /> событие. Выбор события необязателен.
        </p>
      </header>
      <section className={styles.eventOptions}>
        {eventOptions.map((event) => (
          <button
            key={event}
            className={`${styles.eventOption} ${
              eventName === event ? styles.selected : ''
            } ${
              isAttacking ? '' : styles.isProtecting
            }`}
            onClick={() => handleSelectEvent(event)}
          >
            {event}
          </button>
        ))}
      </section>
    </dialog>
  );
};

export default EventModal;
