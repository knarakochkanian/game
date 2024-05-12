import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface IAuthState {
  isAttacking: boolean;
  placeName: string;
}

const initialState: IAuthState = {
  isAttacking: true,
  placeName: '',
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
  },
});

export const { setIsAttacking, setPlaceName } = generalSlice.actions;

export const selectIsAttacking = (state: RootState) =>
  state.generalReducer.isAttacking;
export const selectPlaceName = (state: RootState) =>
  state.generalReducer.placeName;
export default generalSlice.reducer;
