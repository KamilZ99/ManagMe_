import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import StoryForm from './components/StoryForm';
import StoryList from './components/StoryList';
import TaskForm from './components/TaskForm';
import KanbanBoard from './components/KanbanBoard';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1>ManageMe - Project Management</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:projectId/stories" element={<ProjectStories />} />
          <Route path="/stories/:storyId/tasks" element={<StoryTasks />} />
        </Routes>
      </div>
    </Router>
  );
};

const Home: React.FC = () => (
  <div>
    <ProjectForm />
    <ProjectList />
  </div>
);

const ProjectStories: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <>
      <StoryForm projectId={projectId!} />
      <StoryList projectId={projectId!} />
    </>
  );
};

const StoryTasks: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>();

  return (
    <>  <KanbanBoard storyId={storyId!} />
      <TaskForm storyId={storyId!} />
    
    </>
  );
};

export default App;
