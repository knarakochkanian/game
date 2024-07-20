import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
export interface IInitialState {
  resetMapIfChanged: boolean;
  allSectorsSelected: boolean;
  keyboardInput: string;
  closeSelectionIfChanged: boolean;
  newsActionId: string;
  eventModalId: number;
}

const initialState: IInitialState = {
  closeSelectionIfChanged: false,
  resetMapIfChanged: false,
  allSectorsSelected: false,
  keyboardInput: '',
  newsActionId: '',
  eventModalId: -1,
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
    setEventModalId(state, { payload }: { payload: number }) {
      if (payload === state.eventModalId) {
        state.eventModalId = -1;
      } else {
        state.eventModalId = payload;
      }
    },
    setAllSectorsSelected(state) {
      state.allSectorsSelected = !state.allSectorsSelected;
    },
  },
});

export const {
  setEventModalId,
  setCloseSelectionIfChanged,
  setResetMapIfChanged,
  setAllSectorsSelected,
  setKeyboardInput,
  setNewsActionId,
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
export const selectEventModalId = (state: RootState) =>
  state.helpersReducer.eventModalId;

export default helpersSlice.reducer;
