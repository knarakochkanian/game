import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
export interface IInitialState {
  resetMapIfChanged: boolean;
  allSectorsSelected: boolean;
  keyboardInput: string;
  closeSelectionIfChanged: boolean;
  newsActionId: string;
}

const initialState: IInitialState = {
  closeSelectionIfChanged: false,
  resetMapIfChanged: false,
  allSectorsSelected: false,
  keyboardInput: '',
  newsActionId: '',
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
    setNewsActionId(state, { payload }: { payload: string }) {
      state.newsActionId = payload;
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
  setNewsActionId
} = helpersSlice.actions;

export const selectResetMapIfChanged = (state: RootState) =>
  state.helpersReducer.resetMapIfChanged;
export const selectAllSectorsSelected = (state: RootState) =>
  state.helpersReducer.allSectorsSelected;
export const selectKeyboardInput = (state: RootState) =>
  state.helpersReducer.keyboardInput;
export const selectCloseSelectionIfChanged = (state: RootState) =>
  state.helpersReducer.closeSelectionIfChanged;
export const selectNewsActionId = (state: RootState) =>
  state.helpersReducer.newsActionId;

export default helpersSlice.reducer;
