import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface projectFields {
  id: string;
  value: string;
}

export interface projectDetails {
  projectId: string;
  projectHeading: string;
  task: projectFields[];
}

export interface RootState {
  headerText: {
    title: string;
    subTitle: string;
  };
  projectDetails: {
    projectId: string;
    projectHeading: string;
    task: projectFields[];
  }[]
}

const uniqueId = Math.random().toString(36).substring(7)

const initialState: RootState = {
  headerText: {
    title: 'Good Evening Sir,',
    subTitle: 'Today I`ve worked on following Projects',
  },
  projectDetails: [
    {
      projectId: uniqueId,
      projectHeading: 'Projecet Heading',
      task: [
        {
          id: uniqueId,
          value: ''
        }
      ]
    }
  ],
};

const headerSlice = createSlice({
  name: 'headerSlice',
  initialState,
  reducers: {
    saveHeader: (state, action: PayloadAction<{ title: string; subTitle: string }>) => {
      state.headerText = action.payload;
    },
    // saveProjects: (state, action: PayloadAction<Project>) => {
    //   state.projects.push(action.payload);
    // },
    // deleteProjects: (state, action: PayloadAction<string>) => {
    //   state.projects = state.projects.filter((project) => project.id !== action.payload);
    // },
    saveProjectDetails : (state, action: PayloadAction<projectDetails[]>) => {
      state.projectDetails = action.payload;
    },

    saveProjectTasks : (state, action: PayloadAction<projectFields[]>) => {
      state.projectDetails[0].task = action.payload;
    }
  },
});

export const { saveHeader, saveProjectDetails, saveProjectTasks } = headerSlice.actions;
export default headerSlice.reducer;
