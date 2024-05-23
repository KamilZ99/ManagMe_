// api/ProjectApi.ts
import axios from 'axios';
import Project from '../models/Project';

const API_URL = 'http://localhost:3000/projects';

export const getProjects = async (): Promise<Project[]> => {
  const response = await axios.get(API_URL, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export const addProject = async (project: Project): Promise<Project> => {
  const response = await axios.post(API_URL, project, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export const updateProject = async (project: Project): Promise<Project> => {
  const response = await axios.put(`${API_URL}/${project.id}`, project, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export const deleteProject = async (projectId: string): Promise<void> => {
  await axios.delete(`${API_URL}/${projectId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
};
