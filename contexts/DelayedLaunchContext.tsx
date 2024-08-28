'use client';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import dayjs from 'dayjs';
import { useNTP } from './NTPDateContext';

interface DelayedLaunchContextProps {}

const DelayedLaunchContext = createContext<
  DelayedLaunchContextProps | undefined
>(undefined);

export const DelayedLaunchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { getDate } = useNTP(); // Get the date from NTP context

  useEffect(() => {
    const interval = setInterval(() => {
      const storedActions = localStorage.getItem('actionsInQueue');
      const actionsInQueue = storedActions ? JSON.parse(storedActions) : [];

      const storedCompletedActions = localStorage.getItem('completedActions');
      const completedActions = storedCompletedActions
        ? JSON.parse(storedCompletedActions)
        : [];

      const now = getDate();
      let actionsCompleted = false;

      const remainingActions = actionsInQueue.filter((action: any) => {
        const actionDate = dayjs(action.date, 'DD.MM.YYYY HH:mm').toDate();
        if (now && now.getTime() >= actionDate.getTime()) {
          completedActions.push({ ...action, isCompleted: true });
          actionsCompleted = true;
          return false;
        }
        return true;
      });

      localStorage.setItem('actionsInQueue', JSON.stringify(remainingActions));
      localStorage.setItem(
        'completedActions',
        JSON.stringify(completedActions)
      );

      if (actionsCompleted) {
        window.location.reload();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [getDate]);

  return (
    <DelayedLaunchContext.Provider value={{}}>
      {children}
    </DelayedLaunchContext.Provider>
  );
};

export const useDelayedLaunch = () => {
  const context = useContext(DelayedLaunchContext);
  if (!context) {
    throw new Error(
      'useDelayedLaunch must be used within a DelayedLaunchProvider'
    );
  }
  return context;
};
