import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface IAuthState {
  isAttacking: boolean;
}

const initialState: IAuthState = {
  isAttacking: true,
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setIsAttacking(state, { payload }) {
      state.isAttacking = payload;
    },
  },
});

export const { setIsAttacking } = generalSlice.actions;

export const selectIsAttacking = (state: RootState) =>
  state.generalReducer.isAttacking;

export default generalSlice.reducer;
