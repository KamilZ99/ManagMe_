import React, { useState, useEffect } from 'react';
import axios from 'axios';

type ProjectFormProps = {
  onSubmit: (data: { name: string, description: string, assignedUserId?: string }) => void;
  initialData?: { name: string, description: string, assignedUserId?: string } | null;
};

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [assignedUserId, setAssignedUserId] = useState(initialData?.assignedUserId || '');
  const [users, setUsers] = useState<{ _id: string, username: string }[]>([]);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setAssignedUserId(initialData.assignedUserId || '');
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
    onSubmit({ name, description, assignedUserId });
    setName('');
    setDescription('');
    setAssignedUserId('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectName">
          Project Name 📁
        </label>
        <input 
          type="text" 
          id="projectName"
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Project Name" 
          className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required 
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectDescription">
          Project Description 📝
        </label>
        <input 
          type="text" 
          id="projectDescription"
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Project Description" 
          className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required 
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assignedUserId">
          Assign To 👤
        </label>
        <select
          id="assignedUserId"
          value={assignedUserId}
          onChange={(e) => setAssignedUserId(e.target.value)}
          className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        {initialData ? 'Update Project' : 'Add Project'}
      </button>
    </form>
  );
};

export default ProjectForm;
