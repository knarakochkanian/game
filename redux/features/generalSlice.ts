import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import industry from '../../data/industryData';
import countriesWithCodes from '../../data/countriesWithCodes';
import {
  addToPickedCountryObjects,
  removeFromPickedCountryObjects,
} from '../../helpers';

export interface IInitialState {
  isAttacking: boolean;
  placeName: string;
  blur: boolean;
  firstClick: boolean;
  isOnboardingPassed: boolean;
  pickedCountries: string[];
  pickedCountriesObjects: IPlace[];
  damageLevel: string;
  sectors: ISector[];
  places: IPlace[];
  sideNavIsOpen: boolean;
}

const initialState: IInitialState = {
  isAttacking: true,
  firstClick: true,
  isOnboardingPassed: false,
  placeName: '',
  blur: false,
  pickedCountries: [],
  pickedCountriesObjects: [],
  damageLevel: '',
  sectors: industry.sectors,
  places: countriesWithCodes,
  sideNavIsOpen: false,
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setSelectedIndusties(
      state,
      { payload }: { payload: { name: string; parent: string } }
    ) {
      const index = state.sectors.findIndex(
        (sector) => sector.title === payload.parent
      );

      state.sideNavIsOpen = true;

      const targetOptionIndex = state.sectors[index]?.options.findIndex(
        (option) => option.name === payload.name
      );
      const targetOption = state.sectors[index].options[targetOptionIndex];

      targetOption.selected = !targetOption.selected;
    },
    setIsAttacking(state, { payload }) {
      state.isAttacking = payload;
    },
    setSideNavIsOpen(state, { payload }) {
      state.sideNavIsOpen = payload;
    },
    setDamageLevel(state, { payload }) {
      state.sideNavIsOpen = true;
      state.damageLevel = payload;
    },
    setPlaceName(state, { payload }) {
      if (payload === state.placeName) {
        state.firstClick = !state.firstClick;
      } else {
        state.firstClick = false;
        state.placeName = payload;
      }
    },
    addToPickedCountries(state, { payload }) {
      const targetPlace = state.places.find(
        (place) => place.name === payload.name
      );

      if (targetPlace) {
        targetPlace.isSelected = true;
      }

      if (payload) {
        state.sideNavIsOpen = true;
      }

      addToPickedCountryObjects(state, payload);

      if (state.pickedCountries.includes(payload)) return;
      if (payload) {
        state.pickedCountries = [...state.pickedCountries, payload];
      }
    },
    removeFromPickedCountries(state, { payload }) {
      const targetPlace = state.places.find((place) => place.name === payload);

      if (targetPlace) {
        targetPlace.isSelected = false;
      }

      state.sideNavIsOpen = true;

      removeFromPickedCountryObjects(state, payload);

      if (!state.pickedCountries.includes(payload)) return;
      state.pickedCountries.splice(state.pickedCountries.indexOf(payload), 1);
    },
    setBlur(state, { payload }) {
      state.blur = payload;
    },
  },
});

export const {
  setSideNavIsOpen,
  setBlur,
  setIsAttacking,
  setPlaceName,
  addToPickedCountries,
  removeFromPickedCountries,
  setDamageLevel,
  setSelectedIndusties,
} = generalSlice.actions;

export const selectIsAttacking = (state: RootState) =>
  state.generalReducer.isAttacking;
export const selectPlaceName = (state: RootState) =>
  state.generalReducer.placeName;
export const selectBlur = (state: RootState) => state.generalReducer.blur;

export const selectPickedCountries = (state: RootState) =>
  state.generalReducer.pickedCountries;
export const selectPickedCountriesObjects = (state: RootState) =>
  state.generalReducer.pickedCountriesObjects;
export const selectFirstClick = (state: RootState) =>
  state.generalReducer.firstClick;
export const selectDamgeLevel = (state: RootState) =>
  state.generalReducer.damageLevel;
export const selectSectors = (state: RootState) => state.generalReducer.sectors;
export const selectPlaces = (state: RootState) => state.generalReducer.places;
export const selectSideNavIsOpen = (state: RootState) =>
  state.generalReducer.sideNavIsOpen;

export default generalSlice.reducer;
