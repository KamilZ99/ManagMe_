import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProject } from '../api/projectApi';
import { Project } from '../types';

const ProjectItem: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      const token = localStorage.getItem('token');
      if (token && projectId) {
        const fetchedProject = await getProject(projectId, token);
        setProject(fetchedProject);
      }
    };
    fetchProject();
  }, [projectId]);

  if (!project) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{project.name}</h2>
      <p>{project.description}</p>
    </div>
  );
};

export default ProjectItem;
