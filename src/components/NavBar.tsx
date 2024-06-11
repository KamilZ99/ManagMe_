import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { googleLogout } from '@react-oauth/google';

const Navbar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    googleLogout();
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white dark:bg-gray-900 py-2 z-20 bg-gradient-to-r from-[#f2f2f2] to-[#EAEAEA] dark:from-gray-800 dark:to-gray-700">
      <div className="container mx-auto flex justify-between items-center rounded-full bg-gray-100 dark:bg-gray-800 px-4 py-2">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-10 mr-4" />
        </div>
        <div className="flex items-center space-x-4">
          <ul className="flex space-x-4 items-center">
            <li>
              <Link to="/dashboard" className="text-black dark:text-white px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/profile" className="text-black dark:text-white px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300">
                Profile
              </Link>
            </li>
          </ul>
          <button onClick={handleLogout} className="text-black dark:text-white px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
