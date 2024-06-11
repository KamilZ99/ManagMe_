import React, { useState, useEffect } from 'react';
import axios from 'axios';

type TaskFormProps = {
  onSubmit: (data: { name: string, description: string, priority: string, estimatedTime: number, status: 'todo' | 'doing' | 'done', startDate?: Date, endDate?: Date, ownerId?: string, assignedUserId?: string }) => void;
  task?: { name: string, description: string, priority: string, estimatedTime: number, status: 'todo' | 'doing' | 'done', startDate?: Date, endDate?: Date, ownerId?: string, assignedUserId?: string } | null;
};

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, task }) => {
  const [name, setName] = useState(task?.name || '');
  const [description, setDescription] = useState(task?.description || '');
  const [priority, setPriority] = useState(task?.priority || 'low');
  const [estimatedTime, setEstimatedTime] = useState(task?.estimatedTime || 0);
  const [status, setStatus] = useState<'todo' | 'doing' | 'done'>(task?.status || 'todo');
  const [startDate, setStartDate] = useState<string>(task?.startDate ? new Date(task.startDate).toISOString().split('T')[0] : '');
  const [endDate, setEndDate] = useState<string>(task?.endDate ? new Date(task.endDate).toISOString().split('T')[0] : '');
  const [assignedUserId, setAssignedUserId] = useState<string>(task?.assignedUserId || '');
  const [users, setUsers] = useState<{ _id: string, username: string }[]>([]);

  useEffect(() => {
    if (task) {
      setName(task.name);
      setDescription(task.description);
      setPriority(task.priority);
      setEstimatedTime(task.estimatedTime);
      setStatus(task.status);
      setStartDate(task.startDate ? new Date(task.startDate).toISOString().split('T')[0] : '');
      setEndDate(task.endDate ? new Date(task.endDate).toISOString().split('T')[0] : '');
      setAssignedUserId(task.assignedUserId || ''); 
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
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ 
      name, 
      description, 
      priority, 
      estimatedTime, 
      status, 
      startDate: startDate ? new Date(startDate) : undefined, 
      endDate: endDate ? new Date(endDate) : undefined, 
      assignedUserId 
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl flex-grow">
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="name">
          Task Name 📋
        </label>
        <input 
          type="text" 
          id="name"
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Task Name" 
          className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
          required 
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="description">
          Description 📝
        </label>
        <textarea 
          id="description"
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Task Description" 
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
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="estimatedTime">
          Estimated Time ⏳
        </label>
        <input 
          type="number" 
          id="estimatedTime"
          value={estimatedTime} 
          onChange={(e) => setEstimatedTime(parseInt(e.target.value))} 
          placeholder="Estimated Time" 
          className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
          required 
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="status">
          Status 🏷️
        </label>
        <select 
          id="status"
          value={status} 
          onChange={(e) => setStatus(e.target.value as 'todo' | 'doing' | 'done')} 
          className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="todo">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="startDate">
          Start Date 📅
        </label>
        <input 
          type="date" 
          id="startDate"
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)} 
          className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="endDate">
          End Date 📅
        </label>
        <input 
          type="date" 
          id="endDate"
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)} 
          className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="assignedUserId">
          Assign To 👤
        </label>
        <select
          id="assignedUserId"
          value={assignedUserId}
          onChange={(e) => setAssignedUserId(e.target.value)}
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
        className="bg-blue-500 hover:bg-blue-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white font-bold w-full py-3 rounded-lg focus:outline-none focus:shadow-outline"
      >
        {task ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  );
};

export default TaskForm;
