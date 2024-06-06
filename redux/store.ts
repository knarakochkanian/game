'use client';
import { configureStore } from '@reduxjs/toolkit';
import generalReducer from './features/generalSlice';
import helpersReducer from './features/helpersSlice';

import logger from 'redux-logger';

export const makeStore = () => {
  return configureStore({
    reducer: {
      generalReducer,
      helpersReducer,
    },
    middleware: (getDefaultMiddleware) =>
      process.env.NODE_ENV === 'development'
        ? getDefaultMiddleware().concat(logger)
        : getDefaultMiddleware(),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
