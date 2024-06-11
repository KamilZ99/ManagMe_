import axios from 'axios';
import { Story } from '../types';

const BASE_URL = 'http://localhost:5000/api/stories';

export const createStory = async (storyData: { name: string, description: string, priority: string, status: string, projectId: string }, token: string): Promise<Story> => {
  const response = await axios.post(BASE_URL, storyData, {
    headers: {
      'x-auth-token': token
    }
  });
  return response.data;
};

export const getStories = async (projectId: string, token: string): Promise<Story[]> => {
  const response = await axios.get(`${BASE_URL}?projectId=${projectId}`, {
    headers: {
      'x-auth-token': token
    }
  });
  return response.data;
};

export const updateStory = async (storyId: string, storyData: { name: string, description: string, priority: string, status: string, projectId: string }, token: string): Promise<Story> => {
  const response = await axios.put(`${BASE_URL}/${storyId}`, storyData, {
    headers: {
      'x-auth-token': token
    }
  });
  return response.data;
};

export const deleteStory = async (storyId: string, token: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${storyId}`, {
    headers: {
      'x-auth-token': token
    }
  });
};
