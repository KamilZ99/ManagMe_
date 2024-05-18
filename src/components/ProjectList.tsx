import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import ProjectItem from './ProjectItem';

const ProjectList: React.FC = () => {
  const projects = useSelector((state: RootState) => state.project.projects);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4">Projects List 📋</h2>
      {projects.map(project => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;
