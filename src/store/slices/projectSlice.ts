import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import Project from '../../models/Project';
import * as ProjectApi from '../../api/ProjectApi';

interface ProjectState {
  projects: Project[];
  editingProject: Project | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  editingProject: null,
  loading: false,
  error: null,
};

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  return await ProjectApi.getProjects();
});

export const createProject = createAsyncThunk('projects/createProject', async (project: Project) => {
  const response = await ProjectApi.addProject(project);
  return response;
});

export const editProject = createAsyncThunk('projects/editProject', async (project: Project) => {
  const response = await ProjectApi.updateProject(project);
  return response;
});

export const removeProject = createAsyncThunk('projects/removeProject', async (projectId: string) => {
  await ProjectApi.deleteProject(projectId);
  return projectId;
});

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setEditingProject(state, action: PayloadAction<Project | null>) {
      state.editingProject = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchProjects.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch projects';
    });
    builder.addCase(createProject.fulfilled, (state, action) => {
      state.projects.push(action.payload);
    });
    builder.addCase(editProject.fulfilled, (state, action) => {
      const index = state.projects.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    });
    builder.addCase(removeProject.fulfilled, (state, action) => {
      state.projects = state.projects.filter(project => project.id !== action.payload);
    });
  },
});

export const { setEditingProject } = projectSlice.actions;

export default projectSlice.reducer;
