import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, googleLogin } from '../api/authApi';
import { useAuth } from '../contexts/AuthContext';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login: loginUser } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(formData);
      localStorage.setItem('token', data.token);
      loginUser();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const token = credentialResponse.credential;
      console.log('Received Google token:', token);

      if (token) {
        const data = await googleLogin(token);
        console.log('Received data from backend:', data);
        localStorage.setItem('token', data.token);
        loginUser();
        navigate('/');
      } else {
        console.error('No credential response');
      }
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r bg-[#252A34]">
      <div className="bg-white p-10 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="block w-full px-6 py-3 bg-[#FF2E63] text-white rounded-lg shadow hover:bg-[#d02752] transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
