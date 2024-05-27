// ProjectItem.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Project } from '../models/Project';
import { setEditingProject, removeProject } from '../store/slices/projectSlice';
import { AppDispatch } from '../store/store'; // Import AppDispatch

interface ProjectItemProps {
  project: Project;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = () => {
    dispatch(setEditingProject(project));
  };

  const handleDelete = () => {
    dispatch(removeProject(project._id));
  };

  const handleViewStories = () => {
    navigate(`/projects/${project._id}/stories`);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
      <p className="text-gray-700 mb-4">{project.description}</p>
      <div className="flex space-x-2">
        <button 
          onClick={handleEdit} 
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Edit
        </button>
        <button 
          onClick={handleDelete} 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Delete
        </button>
        <button 
          onClick={handleViewStories} 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          View Stories
        </button>
      </div>
    </div>
  );
};

export default ProjectItem;
