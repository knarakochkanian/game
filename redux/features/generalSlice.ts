import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface IAuthState {
  isAttacking: boolean;
  placeName: string;
  firstClick: boolean;
  pickedCountries: string[];
}

const initialState: IAuthState = {
  isAttacking: true,
  firstClick: true,
  placeName: '',
  pickedCountries: [],
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setIsAttacking(state, { payload }) {
      state.isAttacking = payload;
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
  },
});

export const {
  setIsAttacking,
  setPlaceName,
  addToPickedCountries,
  removeFromPickedCountries,
} = generalSlice.actions;

export const selectIsAttacking = (state: RootState) =>
  state.generalReducer.isAttacking;
export const selectPlaceName = (state: RootState) =>
  state.generalReducer.placeName;
export const selectPickedCountries = (state: RootState) =>
  state.generalReducer.pickedCountries;
export const selectFirstClick = (state: RootState) =>
  state.generalReducer.firstClick;

export default generalSlice.reducer;
