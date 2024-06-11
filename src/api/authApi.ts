import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/auth';

export const register = async (userData: { username: string, email: string, password: string }) => {
  const response = await axios.post(`${BASE_URL}/register`, userData);
  return response.data;
};

export const login = async (userData: { email: string, password: string }) => {
  const response = await axios.post(`${BASE_URL}/login`, userData);
  return response.data;
};

export const googleLogin = async (token: string) => {
  const response = await axios.post(`${BASE_URL}/google-login`, { token });
  return response.data;
};

export const getUser = async (token: string) => {
  const response = await axios.get(`${BASE_URL}/user`, {
    headers: {
      'x-auth-token': token
    }
  });
  return response.data;
};

export const getUsers = async (token: string) => {
  const response = await axios.get(`${BASE_URL}/users`, {
    headers: {
      'x-auth-token': token
    }
  });
  return response.data;
};
