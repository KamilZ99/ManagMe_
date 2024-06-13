import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Notification {
  _id: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  read: boolean;
  createdAt: string;
}

const NotificationsCounter: React.FC = () => {
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    const fetchLatestNotification = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get('http://localhost:5000/api/notifications/latest', {
          headers: {
            'x-auth-token': token
          }
        });
        if (response.data && (response.data.priority === 'medium' || response.data.priority === 'high')) {
          setNotification(response.data);
        }
      }
    };

    fetchLatestNotification();
  }, []);

  const markAsRead = async (id: string) => {
    const token = localStorage.getItem('token');
    if (token) {
      await axios.put(`http://localhost:5000/api/notifications/markAsRead/${id}`, {}, {
        headers: {
          'x-auth-token': token
        }
      });
      setNotification(null);
    }
  };

  return (
    notification && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p>{notification.message}</p>
          <button
            onClick={() => markAsRead(notification._id)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Zamknij
          </button>
        </div>
      </div>
    )
  );
};

export default NotificationsCounter;
