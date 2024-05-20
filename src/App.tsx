import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import StoryForm from './components/StoryForm';
import StoryList from './components/StoryList';
import TaskForm from './components/TaskForm';
import KanbanBoard from './components/KanbanBoard';
import Login from './auth/Login';
import Register from './auth/Register';
import { AuthProvider } from './auth/authContext';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction, checkAuth, RootState } from './store/store';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <div className="flex-grow p-4">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/projects/:projectId/stories" element={<ProtectedRoute><ProjectStories /></ProtectedRoute>} />
              <Route path="/stories/:storyId/tasks" element={<ProtectedRoute><StoryTasks /></ProtectedRoute>} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

const NavBar: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    dispatch(logoutAction());
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">ManageMe</Link>
        <div className="flex space-x-4">
          <Link to="/" className="hover:underline">Projects</Link>
          <Link to="/projects/:projectId/stories" className="hover:underline">Stories</Link>
          <Link to="/stories/:storyId/tasks" className="hover:underline">Tasks</Link>
          {isAuthenticated && (
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

const Home: React.FC = () => (
  <div className="flex space-x-4">
    <div className="w-1/3">
      <ProjectForm />
    </div>
    <div className="w-2/3">
      <ProjectList />
    </div>
  </div>
);

const ProjectStories: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <div className="flex space-x-4">
      <div className="w-1/3">
        <StoryForm projectId={projectId!} />
      </div>
      <div className="w-2/3">
        <StoryList projectId={projectId!} />
      </div>
    </div>
  );
};

const StoryTasks: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>();

  return (
    <div className="flex space-x-4">
      <div className="w-1/3">
        <TaskForm storyId={storyId!} />
      </div>
      <div className="w-2/3">
        <KanbanBoard storyId={storyId!} />
      </div>
    </div>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-blue-600 text-white p-4">
    <div className="container mx-auto text-center">
      &copy; {new Date().getFullYear()} ManageMe. All rights reserved.
    </div>
  </footer>
);

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default App;
