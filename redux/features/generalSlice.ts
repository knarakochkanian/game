import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import industry from '../../data/industryData';
import countriesWithCodes from '../../data/countriesWithCodes';

export interface IAuthState {
  isAttacking: boolean;
  placeName: string;
  blur: boolean;
  firstClick: boolean;
  pickedCountries: string[];
  damageLevel: string;
  sectors: ISector[];
  places: IPlace[];
}

const initialState: IAuthState = {
  isAttacking: true,
  firstClick: true,
  placeName: '',
  blur: false,
  pickedCountries: [],
  damageLevel: '',
  sectors: industry.sectors,
  places: countriesWithCodes,
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

      const targetOptionIndex = state.sectors[index]?.options.findIndex(
        (option) => option.name === payload.name
      );
      const targetOption = state.sectors[index].options[targetOptionIndex];

      targetOption.selected = !targetOption.selected;
    },
    setIsAttacking(state, { payload }) {
      state.isAttacking = payload;
    },
    setDamageLevel(state, { payload }) {
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
      const targetPlace = state.places.find((place) => place.name === payload);

      if (targetPlace) {
        targetPlace.isSelected = true;
      }

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

      if (!state.pickedCountries.includes(payload)) return;
      state.pickedCountries.splice(state.pickedCountries.indexOf(payload), 1);
    },
    setBlur(state, { payload }) {
      state.blur = payload;
    },
  },
});

export const {
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
export const selectFirstClick = (state: RootState) =>
  state.generalReducer.firstClick;
export const selectDamgeLevel = (state: RootState) =>
  state.generalReducer.damageLevel;
export const selectSectors = (state: RootState) => state.generalReducer.sectors;
export const selectPlaces = (state: RootState) => state.generalReducer.places;

export default generalSlice.reducer;
