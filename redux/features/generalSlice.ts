import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface IAuthState {
  isAttacking: boolean;
  placeName: string;
  blur: boolean;
}

const initialState: IAuthState = {
  isAttacking: true,
  placeName: '',
  blur: false,
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setIsAttacking(state, { payload }) {
      state.isAttacking = payload;
    },
    setPlaceName(state, { payload }) {
      state.placeName = payload;
    },
    setBlur(state, { payload }) {
      state.blur = payload;
    },
  },
});

export const { setIsAttacking, setPlaceName, setBlur } = generalSlice.actions;

export const selectIsAttacking = (state: RootState) =>
  state.generalReducer.isAttacking;
export const selectPlaceName = (state: RootState) =>
  state.generalReducer.placeName;
export const selectBlur = (state: RootState) => state.generalReducer.blur;
export default generalSlice.reducer;
