import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface IInitialState {
  resetMapIfChanged: boolean;
}

const initialState: IInitialState = {
  resetMapIfChanged: false,
};

const helpersSlice = createSlice({
  name: 'helpers',
  initialState,
  reducers: {
    setResetMapIfChanged(state) {
        state.resetMapIfChanged = !state.resetMapIfChanged;
      },
  },
});

export const {
    setResetMapIfChanged
} = helpersSlice.actions;

export const selectResetMapIfChanged = (state: RootState) =>
  state.helpersReducer.resetMapIfChanged;

export default helpersSlice.reducer;
