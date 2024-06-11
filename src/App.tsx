import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ProjectDetails from './pages/ProjectDetails';
import StoryDetails from './pages/StoryDetails';
import TaskDetails from './pages/TaskDetails';
import Profile from './pages/Profile';
import Navbar from './components/NavBar';
import ThemeSwitcher from './components/ThemeSwitcher';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import WelcomeScreen from './pages/WelcomeScreen';
import './assets/kanban.css';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId="454711293016-o1bhg70vlrrca1n7t03isesq9p6v3223.apps.googleusercontent.com">
      <AuthProvider>
        <Router>
          <AuthContent />
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

const AuthContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><ProjectDetails /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/project/:projectId" element={<PrivateRoute><ProjectDetails /></PrivateRoute>} />
        <Route path="/project/:projectId/stories" element={<PrivateRoute><StoryDetails /></PrivateRoute>} />
        <Route path="/story/:storyId/tasks" element={<PrivateRoute><TaskDetails /></PrivateRoute>} />
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <WelcomeScreen />} />
      </Routes>
      <ThemeSwitcher />
    </>
  );
};

export default App;
