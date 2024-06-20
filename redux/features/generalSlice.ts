import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import industry from '../../data/industryData';
import countriesWithCodes from '../../data/countriesWithCodes';
import {
  addToPickedCountryObjects,
  removeFromPickedCountryObjects,
} from '../../helpers';
import { RESET, SELECT_ALL } from '../../constants';

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
  totalPopulationRegions: number;
  formattedFinancialLosses: string;
  onBoardingBlur: any;
  localTimeBlur: any;
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
  totalPopulationRegions: 20,
  formattedFinancialLosses: '12 млн $',
  onBoardingBlur: {
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
  },
  localTimeBlur: true,
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    proccesIndustriesByTitle(
      state,
      { payload }: { payload: { title: string; actionType: string } }
    ) {
      const { actionType, title } = payload;
      const shouldReset = actionType === RESET;
      state.sectors
        .find((sector) => sector.title === title)
        ?.options.forEach(
          (option) => (option.selected = shouldReset ? false : true)
        );
    },
    processAllIndustries(state, { payload }: { payload: string }) {
      const shouldReset = payload === RESET;
      state.sectors.forEach((sector) =>
        sector.options.forEach(
          (option) => (option.selected = shouldReset ? false : true)
        )
      );
    },
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
    resetDamageLevel(state) {
      state.damageLevel = '';
    },
    setSingleRegionStatus(
      state,
      { payload }: { payload: { parentCountry: string; region: string } }
    ) {
      const parentCountry = state.pickedCountriesObjects.find(
        (country) => country.name === payload.parentCountry
      );
      if (!parentCountry) return;

      const region = parentCountry.regions?.find(
        (region) => region.name === payload.region
      );
      if (!region) return;

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

          if (isSameData) {
            state.firstClick = !state.firstClick;
          } else {
            state.firstClick = false;
            state.placeName = payload;
          }
          break;
        case 'object': //array of strings
          isSameData =
            JSON.stringify(payload.members) === JSON.stringify(state.placeName);
          let updatedPlaceName;

          if (isSameData) {
            state.firstClick = !state.firstClick;
          } else {
            state.firstClick = false;

            switch (payload.action) {
              case RESET:
                updatedPlaceName = [...payload.members].filter((place) =>
                  state.pickedCountries.includes(place)
                );

                break;
              case SELECT_ALL:
                updatedPlaceName = [...payload.members].filter(
                  (place) => !state.pickedCountries.includes(place)
                );
                break;
            }

            state.placeName = updatedPlaceName as [];
          }
          break;
      }
    },
    setTotalPopulationRegions(state, { payload }) {
      state.totalPopulationRegions = payload;
    },
    setFormattedFinancialLosses(state, { payload }) {
      state.formattedFinancialLosses = payload;
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
      removeFromPickedCountryObjects(state, payload);

      if (!state.pickedCountries.includes(payload)) return;
      state.pickedCountries.splice(state.pickedCountries.indexOf(payload), 1);
    },
    setBlur(state, { payload }) {
      state.blur = payload;
    },
    setOnBoardingBlur(state, { payload }) {
      state.onBoardingBlur = payload;
    },
    setLocalTimeBlur(state, { payload }) {
      state.localTimeBlur = payload;
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
  resetDamageLevel,
  setSelectedIndusties,
  setCurrentAction,
  setCurrentActionDate,
  resetGeneralState,
  setActiveBlocks,
  setRegionsStatus,
  setSingleRegionStatus,
  setTotalPopulationRegions,
  setFormattedFinancialLosses,
  setComfirmedFromOnboarding,
  processAllIndustries,
  proccesIndustriesByTitle,
  setOnBoardingBlur,
  setLocalTimeBlur,
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
export const selectTotalPopulationRegions = (state: RootState) =>
  state.generalReducer.totalPopulationRegions;
export const selectFormattedFinancialLosses = (state: RootState) =>
  state.generalReducer.formattedFinancialLosses;
export const selectComfirmedFromOnboarding = (state: RootState) =>
  state.generalReducer.comfirmedFromOnboarding;
export const selectOnboardingBlur = (state: RootState) =>
  state.generalReducer.onBoardingBlur;
export const selectLocalTimeBlur = (state: RootState) =>
  state.generalReducer.localTimeBlur;

export default generalSlice.reducer;
