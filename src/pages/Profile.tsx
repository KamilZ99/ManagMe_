import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUser } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

type Notification = {
  _id: string;
  message: string;
  read: boolean;
  createdAt: string;
};

const Profile: React.FC = () => {
  const [user, setUser] = useState<{ _id: string, username: string, email: string, role: string } | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await getUser(token);
        setUser(userData);
      } else {
        navigate('/login');
      }
    };

    const fetchNotifications = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get('http://localhost:5000/api/notifications', {
          headers: {
            'x-auth-token': token
          }
        });
        setNotifications(response.data);
      }
    };

    fetchUser();
    fetchNotifications();
  }, [navigate]);

  const markAsRead = async (id: string) => {
    const token = localStorage.getItem('token');
    if (token) {
      await axios.put(`http://localhost:5000/api/notifications/markAsRead/${id}`, {}, {
        headers: {
          'x-auth-token': token
        }
      });
      setNotifications(notifications.filter(notification => notification._id !== id));
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

 

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#f2f2f2] to-[#EAEAEA] dark:from-gray-800 dark:to-gray-700 flex justify-center items-center py-10">
      <div className="w-2/3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">Profile</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Account ID:</strong> {user._id}</p>
        <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Username:</strong> {user.username}</p>
        <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Email:</strong> {user.email}</p>
        <p className="text-gray-700 dark:text-gray-300 mb-4"><strong>Role:</strong> {user.role}</p>
        
       
        
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
        
        <h2 className="text-xl font-bold mt-6 text-black dark:text-white">Notifications</h2>
        <ul className="mt-4 space-y-2">
          {notifications.map(notification => (
            <li key={notification._id} className="bg-gray-100 dark:white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <span>{notification.message}</span>
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification._id)}
                    className="ml-4 bg-gray-500 text-white px-2 py-1 rounded"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            </li>
          ))} 
        </ul>
      </div>
    </div>
  );
};

export default Profile;
