import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import industry from '../../data/industryData';
import countriesWithCodes from '../../data/countriesWithCodes';
import {
  addToPickedCountryObjects,
  removeFromPickedCountryObjects,
} from '../../helpers';

export interface IInitialState {
  comfirmedFromOnboarding: boolean;
  currentAction: IAction | null;
  isAttacking: boolean;
  placeName: string | string[];
  blur: boolean;
  firstClick: boolean;
  isOnboardingPassed: boolean;
  pickedCountries: string[];
  pickedCountriesObjects: IPlace[];
  damageLevel: string;
  sectors: ISector[];
  places: IPlace[];
  sideNavIsOpen: boolean;
  activeBlocks: string[];
}

const initialState: IInitialState = {
  comfirmedFromOnboarding: false,
  activeBlocks: [],
  currentAction: null,
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
    resetGeneralState(state) {
      const initialStateCopy = { ...initialState };
      initialStateCopy.isAttacking = state.isAttacking;

      return initialStateCopy;
    },
    setCurrentActionDate(state, { payload }: { payload: string }) {
      (state.currentAction as IAction).date = payload;
    },
    setCurrentAction(state, { payload }: { payload: IAction }) {
      state.currentAction = payload;
    },
    setComfirmedFromOnboarding(state, { payload }: { payload: boolean }) {
      state.comfirmedFromOnboarding = payload;
    },
    setActiveBlocks(state, { payload }: { payload: string }) {
      if (state.activeBlocks.includes(payload)) {
        
        state.activeBlocks.splice(state.activeBlocks.indexOf(payload), 1);
      } else {
        state.activeBlocks = [...state.activeBlocks, payload];
      }
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
    setSingleRegionStatus(
      state,
      { payload }: { payload: { parentCountry: string; region: string } }
    ) {
      const parentCountry = state.pickedCountriesObjects.find(
        (country) => country.name === payload.parentCountry
      );
      if (!parentCountry) return;

      const region = parentCountry.regions?.find((region) => region.name === payload.region);
      if(!region) return;

      region.isSelected = !region.isSelected;
    },
    setRegionsStatus(
      state,
      { payload }: { payload: { parentCountry: string; bool: boolean } }
    ) {
      const parentCountry = state.places.find(
        (place) => place.name === payload.parentCountry
      );

      parentCountry?.regions?.forEach((region) => {
        region.isSelected = payload.bool;
      });
    },
    setPlaceName(state, { payload }) {
      let isSameData;
      switch (typeof payload) {
        case 'string':
          isSameData = payload === state.placeName;
          break;
        case 'object': //array of strings
          isSameData =
            JSON.stringify(payload) === JSON.stringify(state.placeName);
          break;
      }

      if (isSameData) {
        state.firstClick = !state.firstClick;
      } else {
        state.firstClick = false;
        state.placeName = payload;
      }
    },
    addToPickedCountries(state, { payload }) {
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
  setCurrentAction,
  setCurrentActionDate,
  resetGeneralState,
  setActiveBlocks,
  setRegionsStatus,
  setSingleRegionStatus,
  setComfirmedFromOnboarding,
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
export const selectCurrentAction = (state: RootState) =>
  state.generalReducer.currentAction;
export const selectActiveBlocks = (state: RootState) =>
  state.generalReducer.activeBlocks;
export const selectComfirmedFromOnboarding = (state: RootState) =>
  state.generalReducer.comfirmedFromOnboarding;

export default generalSlice.reducer;
