import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UnreadNotificationCounter: React.FC = () => {
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadCount = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await axios.get('http://localhost:5000/api/notifications/unread/count', {
        headers: {
          'x-auth-token': token
        }
      });
      setUnreadCount(response.data.count);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
  }, []);

  return (
    <div className="notification-counter">
      <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">{unreadCount}</span>
    </div>
  );
};

export default UnreadNotificationCounter;
