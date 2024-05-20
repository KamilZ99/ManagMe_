import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../auth/authContext';
import { logout } from '../store/store';

const NavBar: React.FC = () => {
  const { isAuthenticated, logout: authLogout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    authLogout();
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">ManageMe</Link>
        <div className="flex space-x-4">
          <Link to="/" className="hover:underline">Projects</Link>
          <Link to="/projects/:projectId/stories" className="hover:underline">Stories</Link>
          <Link to="/stories/:storyId/tasks" className="hover:underline">Tasks</Link>
          {isAuthenticated && (
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
