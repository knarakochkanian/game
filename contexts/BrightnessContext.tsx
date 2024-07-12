'use client';
import React, { createContext, useContext, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface BrightnessContextType {
  selectIsBrightness: boolean;
}

const initialBrightnessContext: BrightnessContextType = {
  selectIsBrightness: false,
};

export const BrightnessContext = createContext<BrightnessContextType>(
  initialBrightnessContext
);

export const BrightnessProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const selectIsBrightnessValue = useSelector(
    (state: RootState) => state.generalReducer.isBrightness
  );

  const contextValue: BrightnessContextType = {
    selectIsBrightness: selectIsBrightnessValue,
  };

  return (
    <BrightnessContext.Provider value={contextValue}>
      {children}
    </BrightnessContext.Provider>
  );
};

export const useBrightness = () => useContext(BrightnessContext);
