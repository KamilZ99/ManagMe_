import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { createProject, editProject, setEditingProject } from '../store/slices/projectSlice';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const ProjectForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const editingProject = useSelector((state: RootState) => state.project.editingProject);
  const [name, setName] = useState(editingProject ? editingProject.name : '');
  const [description, setDescription] = useState(editingProject ? editingProject.description : '');

  useEffect(() => {
    if (editingProject) {
      setName(editingProject.name);
      setDescription(editingProject.description);
    }
  }, [editingProject]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const project = { id: editingProject ? editingProject.id : uuidv4(), name, description };
    if (editingProject) {
      dispatch(editProject(project));
    } else {
      dispatch(createProject(project));
    }
    setName('');
    setDescription('');
    dispatch(setEditingProject(null));
    navigate('/'); 
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-4 animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4">Create New Project 🚀</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Project Name 📂
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Project Name"
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Project Description 📝
        </label>
        <textarea
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Project Description"
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {editingProject ? 'Update' : 'Add'} Project
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
