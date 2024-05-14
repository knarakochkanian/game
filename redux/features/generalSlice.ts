import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  ENERGY,
  FINANCE,
  GOV_INFOSTRUCTURES,
  INDUSTRY,
  IT_SECTOR,
  LOG_AND_TRANSPORT,
  RETAIL,
  UNIVERSE,
  VPK,
} from '../../constants';

export interface IAuthState {
  isAttacking: boolean;
  placeName: string;
  blur: boolean;
  firstClick: boolean;
  pickedCountries: string[];
  damageLevel: string;
  selectedIndusties: {
    title: string;
    options: string[];
  }[];
}

const initialState: IAuthState = {
  isAttacking: true,
  firstClick: true,
  placeName: '',
  blur: false,
  pickedCountries: [],
  damageLevel: '',
  selectedIndusties: [
    {
      title: VPK,
      options: [],
    },

    {
      title: IT_SECTOR,
      options: [],
    },
    {
      title: ENERGY,
      options: [],
    },
    {
      title: FINANCE,
      options: [],
    },
    {
      title: RETAIL,
      options: [],
    },
    {
      title: INDUSTRY,
      options: [],
    },
    {
      title: LOG_AND_TRANSPORT,
      options: [],
    },
    {
      title: UNIVERSE,
      options: [],
    },
    {
      title: GOV_INFOSTRUCTURES,
      options: [],
    },
  ],
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setSelectedIndusties(
      state,
      { payload }: { payload: { name: string; parent: string } }
    ) {
      const index = state.selectedIndusties.findIndex(
        (industry) => industry.title === payload.parent
      );
      state.selectedIndusties[index].options = [
        ...state.selectedIndusties[index].options,
        payload.name,
      ];
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
export const selectSelectedIndustries = (state: RootState) =>
  state.generalReducer.selectedIndusties;

export default generalSlice.reducer;
