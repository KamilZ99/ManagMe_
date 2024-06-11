import axios from 'axios';
import { Project } from '../types';

const BASE_URL = 'http://localhost:5000/api/projects';

export const createProject = async (projectData: { name: string, description: string }, token: string): Promise<Project> => {
  const response = await axios.post(BASE_URL, projectData, {
    headers: {
      'x-auth-token': token
    }
  });
  return response.data;
};

export const getProjects = async (token: string): Promise<Project[]> => {
  const response = await axios.get(BASE_URL, {
    headers: {
      'x-auth-token': token
    }
  });
  return response.data;
};

export const getProject = async (projectId: string, token: string): Promise<Project> => {
  const response = await axios.get(`${BASE_URL}/${projectId}`, {
    headers: {
      'x-auth-token': token
    }
  });
  return response.data;
};

export const updateProject = async (projectId: string, projectData: { name: string, description: string }, token: string): Promise<Project> => {
  const response = await axios.put(`${BASE_URL}/${projectId}`, projectData, {
    headers: {
      'x-auth-token': token
    }
  });
  return response.data;
};

export const deleteProject = async (projectId: string, token: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${projectId}`, {
    headers: {
      'x-auth-token': token
    }
  });
};
