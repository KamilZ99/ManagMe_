import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Project from '../../models/Project';
import ProjectApi from '../../api/ProjectApi';

interface ProjectState {
  projects: Project[];
  editingProject: Project | null;
}

const initialState: ProjectState = {
  projects: ProjectApi.getProjects(),
  editingProject: null,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    addProject(state, action: PayloadAction<Project>) {
      ProjectApi.addProject(action.payload);
      state.projects = ProjectApi.getProjects();
    },
    updateProject(state, action: PayloadAction<Project>) {
      ProjectApi.updateProject(action.payload);
      state.projects = ProjectApi.getProjects();
    },
    deleteProject(state, action: PayloadAction<string>) {
      ProjectApi.deleteProject(action.payload);
      state.projects = ProjectApi.getProjects();
    },
    setEditingProject(state, action: PayloadAction<Project | null>) {
      state.editingProject = action.payload;
    },
  },
});

export const { addProject, updateProject, deleteProject, setEditingProject } = projectSlice.actions;

export default projectSlice.reducer;
