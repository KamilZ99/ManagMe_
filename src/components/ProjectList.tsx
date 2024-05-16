import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import ProjectItem from './ProjectItem';

const ProjectList: React.FC = () => {
  const projects = useSelector((state: RootState) => state.project.projects);

  return (
    <div>
      {projects.map(project => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;
