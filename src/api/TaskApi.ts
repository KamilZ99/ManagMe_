import axios from 'axios';
import { Task } from '../types';

const BASE_URL = 'http://localhost:5000/api/tasks';

export const createTask = async (taskData: { name: string, description: string, priority: string, storyId: string, estimatedTime: number, status: 'todo' | 'doing' | 'done', startDate?: Date, endDate?: Date, ownerId?: string }, token: string): Promise<Task> => {
  const response = await axios.post(BASE_URL, taskData, {
    headers: {
      'x-auth-token': token
    }
  });
  return response.data;
};

export const getTasks = async (storyId: string, token: string): Promise<Task[]> => {
  const response = await axios.get(`${BASE_URL}?storyId=${storyId}`, {
    headers: {
      'x-auth-token': token
    }
  });
  return response.data;
};

export const updateTask = async (taskId: string, taskData: { name: string, description: string, priority: string, estimatedTime: number, status: 'todo' | 'doing' | 'done', startDate?: Date, endDate?: Date }, token: string): Promise<Task> => {
  const response = await axios.put(`${BASE_URL}/${taskId}`, taskData, {
    headers: {
      'x-auth-token': token
    }
  });
  return response.data;
};

export const deleteTask = async (taskId: string, token: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${taskId}`, {
    headers: {
      'x-auth-token': token
    }
  });
};
