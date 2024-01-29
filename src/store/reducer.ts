import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RootState {
  headerText: {
    title: string;
    subTitle: string;
  };
}

// Action type
interface Action {
  type: string;
  payload: object;
}

const initialState: RootState = {
  headerText: {
    title: 'Good Evening Sir,',
    subTitle: 'Today I`ve worked on following Projects',
  },
};

const headerSlice = createSlice({
  name: 'headerSlice',
  initialState,
  reducers: {
    saveHeader: (state, action: PayloadAction<{ title: string; subTitle: string }>) => {
      state.headerText = action.payload;
    },
  },
});

export const { saveHeader } = headerSlice.actions;
export default headerSlice.reducer;
