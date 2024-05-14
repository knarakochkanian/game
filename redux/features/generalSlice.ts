import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface IAuthState {
  isAttacking: boolean;
  placeName: string;
  blur: boolean;
  firstClick: boolean;
  pickedCountries: string[];
  damageLevel: string;
}

const initialState: IAuthState = {
  isAttacking: true,
  firstClick: true,
  placeName: '',
  blur: false,
  pickedCountries: [],
  damageLevel: '',
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
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
      if (state.pickedCountries.includes(payload)) return;
      payload && state.pickedCountries.push(payload);
    },
    removeFromPickedCountries(state, { payload }) {
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

export default generalSlice.reducer;
