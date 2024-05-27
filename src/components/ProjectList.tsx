import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import ProjectItem from './ProjectItem';
import { fetchProjects } from '../store/slices/projectSlice';

const ProjectList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const projects = useSelector((state: RootState) => state.project.projects);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchProjects());
    }
  }, [dispatch, user]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4">Projects List 📋</h2>
      {projects.map(project => (
        <ProjectItem key={project._id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;
