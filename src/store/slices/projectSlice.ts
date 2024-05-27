import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import Project from '../../models/Project';
import * as ProjectApi from '../../api/ProjectApi';
import { RootState } from '../store'

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

export const fetchProjects = createAsyncThunk<Project[], void, { state: RootState }>(
  'projects/fetchProjects',
  async (_, { getState }) => {
    const state = getState();
    const userId = state.auth.user?.id;
    if (!userId) throw new Error('User not authenticated');
    const response = await ProjectApi.getProjects(userId);
    return response;
  }
);

export const createProject = createAsyncThunk<Project, Project, { state: RootState }>(
  'projects/createProject',
  async (project, { getState }) => {
    const state = getState();
    const userId = state.auth.user?.id;
    if (!userId) throw new Error('User not authenticated');
    const newProject = { ...project, ownerId: userId };
    const response = await ProjectApi.addProject(newProject);
    return response;
  }
);

export const editProject = createAsyncThunk<Project, Project>(
  'projects/editProject',
  async (project) => {
    const response = await ProjectApi.updateProject(project);
    return response;
  }
);

export const removeProject = createAsyncThunk<string, string>(
  'projects/removeProject',
  async (projectId) => {
    await ProjectApi.deleteProject(projectId);
    return projectId;
  }
);

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
      const index = state.projects.findIndex(p => p._id === action.payload._id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    });
    builder.addCase(removeProject.fulfilled, (state, action) => {
      state.projects = state.projects.filter(project => project._id !== action.payload);
    });
  },
});

export const { setEditingProject } = projectSlice.actions;

export default projectSlice.reducer;
