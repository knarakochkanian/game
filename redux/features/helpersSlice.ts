import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface IInitialState {
  resetMapIfChanged: boolean;
  allSectorsSelected: boolean;
}

const initialState: IInitialState = {
  resetMapIfChanged: false,
  allSectorsSelected: false,
};

const helpersSlice = createSlice({
  name: 'helpers',
  initialState,
  reducers: {
    setResetMapIfChanged(state) {
      state.resetMapIfChanged = !state.resetMapIfChanged;
    },
    setAllSectorsSelected(state) {
      state.allSectorsSelected = !state.allSectorsSelected;
    },
  },
});

export const { setResetMapIfChanged, setAllSectorsSelected} = helpersSlice.actions;

export const selectResetMapIfChanged = (state: RootState) =>
  state.helpersReducer.resetMapIfChanged;
export const selectAllSectorsSelected = (state: RootState) =>
  state.helpersReducer.allSectorsSelected;

export default helpersSlice.reducer;
