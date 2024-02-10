import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface projectFields {
  id: string;
  value: string;
}

interface Project {
  id: string;
  value: projectFields[];
}

export interface RootState {
  headerText: {
    title: string;
    subTitle: string;
  };
  projectFields: {
    id: string;
    value: string;
  }[]
  projects: {
    id: string;
    value: projectFields[];
  }[]
}

const initialState: RootState = {
  headerText: {
    title: 'Good Evening Sir,',
    subTitle: 'Today I`ve worked on following Projects',
  },
  projects: [],
  projectFields: []
};

const headerSlice = createSlice({
  name: 'headerSlice',
  initialState,
  reducers: {
    saveHeader: (state, action: PayloadAction<{ title: string; subTitle: string }>) => {
      state.headerText = action.payload;
    },
    saveProjects: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    deleteProjects: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter((project) => project.id !== action.payload);
    },
    saveProjectFields : (state, action: PayloadAction<{id: string; projectId: string; value: string}[]>) => {
      state.projectFields = action.payload;
    }
  },
});

export const { saveHeader, saveProjects, saveProjectFields } = headerSlice.actions;
export default headerSlice.reducer;
