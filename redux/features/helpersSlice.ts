import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { RefObject } from 'react';

export interface IInitialState {
  resetMapIfChanged: boolean;
  allSectorsSelected: boolean;
  keyboardInput: string;
  closeSelectionIfChanged: boolean;
}

const initialState: IInitialState = {
  closeSelectionIfChanged: false,
  resetMapIfChanged: false,
  allSectorsSelected: false,
  keyboardInput: '',
};

const helpersSlice = createSlice({
  name: 'helpers',
  initialState,
  reducers: {
    setResetMapIfChanged(state) {
      state.resetMapIfChanged = !state.resetMapIfChanged;
    },
    setCloseSelectionIfChanged(state) {
      state.closeSelectionIfChanged = !state.closeSelectionIfChanged;
    },
    setKeyboardInput(state, { payload }: { payload: string }) {
      state.keyboardInput = payload;
    },
    setAllSectorsSelected(state) {
      state.allSectorsSelected = !state.allSectorsSelected;
    },
  },
});

export const {
  setCloseSelectionIfChanged,
  setResetMapIfChanged,
  setAllSectorsSelected,
  setKeyboardInput,
} = helpersSlice.actions;

export const selectResetMapIfChanged = (state: RootState) =>
  state.helpersReducer.resetMapIfChanged;
export const selectAllSectorsSelected = (state: RootState) =>
  state.helpersReducer.allSectorsSelected;
export const selectKeyboardInput = (state: RootState) =>
  state.helpersReducer.keyboardInput;
export const selectCloseSelectionIfChanged = (state: RootState) =>
  state.helpersReducer.closeSelectionIfChanged;

export default helpersSlice.reducer;
