import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { RefObject } from 'react';

export interface IInitialState {
  resetMapIfChanged: boolean;
  allSectorsSelected: boolean;
  keyboardInput: string;
}

const initialState: IInitialState = {
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
    setKeyboardInput(state, { payload }: { payload: string }) {
      state.keyboardInput = payload;
    },
    setAllSectorsSelected(state) {
      state.allSectorsSelected = !state.allSectorsSelected;
    },
  },
});

export const { setResetMapIfChanged, setAllSectorsSelected, setKeyboardInput } =
  helpersSlice.actions;

export const selectResetMapIfChanged = (state: RootState) =>
  state.helpersReducer.resetMapIfChanged;
export const selectAllSectorsSelected = (state: RootState) =>
  state.helpersReducer.allSectorsSelected;
export const selectKeyboardInput = (state: RootState) =>
  state.helpersReducer.keyboardInput;

export default helpersSlice.reducer;
