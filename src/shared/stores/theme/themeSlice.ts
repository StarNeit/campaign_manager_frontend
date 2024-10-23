import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'shared/stores';

// Define a type for the slice state
interface ThemeState {
  isDarkMode: boolean;
}

// Define the initial state using that type
const initialState: ThemeState = {
  isDarkMode: false
};

export const themeSlice = createSlice({
  name: 'theme',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.isDarkMode = action.payload;
    }
  }
});

export const { setDarkMode } = themeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const isDarkMode = (state: RootState) => state.theme.isDarkMode;

export default themeSlice.reducer;
