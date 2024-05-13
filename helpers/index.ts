import { MutableRefObject } from 'react';
import countriesWithCodes from '../data/countriesWithCodes';
import { DEFAULT_COLOR, PICKED_COLOR } from '../components/Map/theme';
import { AppDispatch } from '../redux/store';
import {
  IAuthState,
  addToPickedCountries,
  removeFromPickedCountries,
} from '../redux/features/generalSlice';
import { Dispatch, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';

export function formatNumber(str: string) {
  let reversed = str.split('').reverse().join('');
  let spaced = reversed.replace(/(\d{3})(?=\d)/g, '$1 ');

  return spaced.split('').reverse().join('');
}

export const truncateString = (inputString: string, maxLength: number) => {
  if (inputString.length <= maxLength) {
    return inputString;
  } else {
    return inputString.slice(0, maxLength - 3) + '...';
  }
};

export const getAction = (
  actionId: string,
  actions: (IAttack | IProtection)[]
): IAttack | IProtection | undefined => {
  return actions.find((action) => action.id === actionId);
};

export const search = (searchText: string) => {
  if (!searchText) return;

  const foundPlaces = countriesWithCodes.filter((country) => {
    return country.name.toLowerCase().includes(searchText.toLowerCase());
  });

  return foundPlaces;
};
