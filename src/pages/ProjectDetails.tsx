import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects, createProject, updateProject, deleteProject } from '../api/projectApi';
import { getUser } from '../api/authApi';
import ProjectForm from '../components/ProjectForm';
import { Project } from '../types';

const ProjectDetails: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [user, setUser] = useState<{ id: string, username: string, role: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const projects = await getProjects(token);
        setProjects(projects || []);
      } else {
        navigate('/login');
      }
    };

    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await getUser(token);
        setUser(userData);
      } else {
        navigate('/login');
      }
    };

    fetchProjects();
    fetchUser(); 
  }, [navigate]);

  const handleCreateProject = async (projectData: { name: string, description: string }) => {
    const token = localStorage.getItem('token');
    if (token) {
      const newProject = await createProject(projectData, token);
      setProjects([...projects, newProject]);
    }
  };

  const handleUpdateProject = async (projectData: { name: string, description: string }) => {
    if (editingProject) {
      const token = localStorage.getItem('token');
      if (token) {
        const updatedProject = await updateProject(editingProject._id, projectData, token);
        setProjects(projects.map(project => (project._id === updatedProject._id ? updatedProject : project)));
        setEditingProject(null);
      }
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    const token = localStorage.getItem('token');
    if (token) {
      await deleteProject(projectId, token);
      setProjects(projects.filter(project => project._id !== projectId));
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-[#f2f2f2] to-[#EAEAEA] dark:from-gray-800 dark:to-gray-700 min-h-screen py-15 ">
      <div className="flex flex-col items-center space-y-4 lg:space-y-6 py-4 lg:py-6">
        <h1 className="text-3xl font-bold text-center text-black dark:text-white">
          Hello, {user?.username}! 😃
        </h1>
        <h3 className="text-lg text-center text-gray-700 dark:text-gray-300">
          What project will we do today?
        </h3>
      </div>

      <div className="flex justify-center items-center py-10">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 -mt-0">
          <div className="xl:w-1/3 w-full bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl">
            <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">{editingProject ? 'Edit Project' : 'Create New Project'} 🚀</h1>
            <ProjectForm
              onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
              initialData={editingProject ? { name: editingProject.name, description: editingProject.description } : undefined}
            />
          </div>
          <div className="lg:w-2/3 w-full bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl">
            <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">Projects List 📋</h1>
            <div className="space-y-6 overflow-y-auto max-h-[50vh]">
              {projects.map((project) => (
                <li key={project._id} className="bg-gradient-to-r from-[#fbfbfb] to-[#fbfbfb] dark:from-gray-700 dark:to-gray-600 p-6 rounded-3xl shadow-md">
                  <h2 className="text-2xl font-bold text-black dark:text-white">Name: {project.name}</h2>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">Desc: {project.description}</p>
                  <div className="flex space-x-4 mt-6">
                    <button
                      onClick={() => setEditingProject(project)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300 shadow"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 shadow"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => navigate(`/project/${project._id}/stories`)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 shadow"
                    >
                      View Stories
                    </button>
                  </div>
                </li>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
