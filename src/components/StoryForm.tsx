import React, { useState, useEffect } from 'react';
import axios from 'axios';

type StoryFormProps = {
  onSubmit: (data: { name: string, description: string, priority: string, status: string, ownerId?: string }) => void;
  initialData?: { name: string, description: string, priority: string, status: string, ownerId?: string } | null;
};

const StoryForm: React.FC<StoryFormProps> = ({ onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [priority, setPriority] = useState(initialData?.priority || 'low');
  const [status, setStatus] = useState(initialData?.status || 'todo');
  const [ownerId, setOwnerId] = useState(initialData?.ownerId || '');
  const [users, setUsers] = useState<{ _id: string, username: string }[]>([]);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setPriority(initialData.priority);
      setStatus(initialData.status);
      setOwnerId(initialData.ownerId || '');
    }

    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get('http://localhost:5000/api/auth/users', {
          headers: {
            'x-auth-token': token
          }
        });
        setUsers(response.data);
      }
    };

    fetchUsers();
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description, priority, status, ownerId });
    setName('');
    setDescription('');
    setPriority('low');
    setStatus('todo');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-3xl">
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="storyName">
          Story Name 📚
        </label>
        <input 
          type="text" 
          id="storyName"
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Story Name" 
          className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
          required 
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="storyDescription">
          Story Description 📝
        </label>
        <input 
          type="text" 
          id="storyDescription"
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Story Description" 
          className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
          required 
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="priority">
          Priority 🚀
        </label>
        <select 
          id="priority"
          value={priority} 
          onChange={(e) => setPriority(e.target.value)} 
          className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="status">
          Status 📊
        </label>
        <select 
          id="status"
          value={status} 
          onChange={(e) => setStatus(e.target.value)} 
          className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="todo">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="ownerId">
          Assign To 👤
        </label>
        <select
          id="ownerId"
          value={ownerId}
          onChange={(e) => setOwnerId(e.target.value)}
          className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select User</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>{user.username}</option>
          ))}
        </select>
      </div>
      <button 
        type="submit" 
        className="bg-[#3b81f6] text-white w-full py-3 rounded-lg hover:bg-purple-600 transition duration-300 shadow"
      >
        {initialData ? 'Update Story' : 'Add Story'}
      </button>
    </form>
  );
};

export default StoryForm;
