import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Project from '../models/Project';
import { deleteProject, setEditingProject } from '../store/slices/projectSlice';

interface ProjectItemProps {
  project: Project;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = () => {
    dispatch(setEditingProject(project));
  };

  const handleDelete = () => {
    dispatch(deleteProject(project.id));
  };

  const handleViewStories = () => {
    navigate(`/projects/${project.id}/stories`);
  };

  return (
    <div>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleViewStories}>View Stories</button>
    </div>
  );
};

export default ProjectItem;
