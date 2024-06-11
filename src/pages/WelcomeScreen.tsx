import React from 'react';
import { Link } from 'react-router-dom';

const WelcomeScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center dark:bg-gray-800 h-screen bg-[#252A34] relative dark:bg-[#1a1d24]">
      <div className="absolute top-10 right-10 animate-bounce">
        <img src="https://static.vecteezy.com/system/resources/thumbnails/017/398/788/small/white-circle-free-png.png" alt="Floating Graphic 1" className="w-50 h-20" />
      </div>
      <div className="absolute bottom-10 left-10 animate-bounce-slow">
        <img src="https://static.vecteezy.com/system/resources/thumbnails/017/398/788/small/white-circle-free-png.png" alt="Floating Graphic 2" className="w-50 h-20" />
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-lg text-center z-10 w-1/3 max-w-4xl">
        <img src="/logo.png" alt="Logo" className="w-54 h-24 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-gray-100">Welcome to ManagMe</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">Your ultimate project management solution</p>
        <div className="space-y-4">
          <Link to="/login" className="block w-full px-6 py-3 bg-[#FF2E63] text-white rounded-lg shadow hover:bg-[#d02752] transition duration-300">
            Login
          </Link>
          <Link to="/register" className="block w-full px-6 py-3 bg-[#FF2E63] text-white rounded-lg shadow hover:bg-[#d02752] transition duration-300">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
