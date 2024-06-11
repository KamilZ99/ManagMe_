import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStories, createStory, updateStory, deleteStory } from '../api/storyApi';
import StoryForm from '../components/StoryForm';
import { Story } from '../types';

const StoryDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [stories, setStories] = useState<Story[]>([]);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchStories = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const stories = await getStories(projectId!, token);
        setStories(stories);
      }
    };
    fetchStories();
  }, [projectId]);

  const handleCreateOrUpdateStory = async (storyData: { name: string, description: string, priority: string, status: string }) => {
    const token = localStorage.getItem('token');
    if (token) {
      if (editingStory) {
        const updatedStory = await updateStory(editingStory._id, { ...storyData, projectId: projectId! }, token);
        setStories(stories.map(story => (story._id === updatedStory._id ? updatedStory : story)));
        setEditingStory(null);
      } else {
        const newStory = await createStory({ ...storyData, projectId: projectId! }, token);
        setStories([...stories, newStory]);
      }
    }
  };

  const handleEditStory = (story: Story) => {
    setEditingStory(story);
  };

  const handleDeleteStory = async (storyId: string) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await deleteStory(storyId, token);
        setStories(stories.filter(story => story._id !== storyId));
        console.log(`Story with ID: ${storyId} successfully deleted`);
      } catch (error) {
        console.error(`Failed to delete story with ID: ${storyId}`, error);
      }
    }
  };

  const filteredStories = stories.filter(story => filter === 'all' || story.status === filter);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#f2f2f2] to-[#EAEAEA] dark:from-gray-800 dark:to-gray-700 flex justify-center items-center py-10">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 t">
        <div className="xl:w-2/3 w-full bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl">
          <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">{editingStory ? 'Edit Story' : 'Create New Story'} 📖</h1>
          <StoryForm 
            onSubmit={handleCreateOrUpdateStory} 
            initialData={editingStory ? { name: editingStory.name, description: editingStory.description, priority: editingStory.priority, status: editingStory.status } : undefined}
          />
        </div>
        <div className="lg:w-2/3 w-full bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl">
          <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">Stories List 📚</h1>
          <div className="mb-6 flex space-x-2">
            <button className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-600'}`} onClick={() => setFilter('all')}>All 📜</button>
            <button className={`px-4 py-2 rounded-lg ${filter === 'todo' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-600'}`} onClick={() => setFilter('todo')}>To Do 📝</button>
            <button className={`px-4 py-2 rounded-lg ${filter === 'doing' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-600'}`} onClick={() => setFilter('doing')}>Doing 📋</button>
            <button className={`px-4 py-2 rounded-lg ${filter === 'done' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-600'}`} onClick={() => setFilter('done')}>Done ✅</button>
          </div>
          <ul className="space-y-6">
            {filteredStories.map(story => (
              <li key={story._id} className="bg-gradient-to-r from-[#fbfbfb] to-[#fbfbfb] dark:from-gray-700 dark:to-gray-600 p-6 rounded-3xl shadow-md">
                <h2 className="text-2xl font-bold text-black dark:text-white">{story.name}</h2>
                <p className="text-gray-700 dark:text-gray-300 mt-2">{story.description}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Priority: {story.priority}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Status: {story.status}</p>
                <div className="flex space-x-4 mt-6">
                  <button 
                    onClick={() => handleEditStory(story)} 
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300 shadow"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteStory(story._id)} 
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 shadow"
                  >
                    Delete
                  </button>
                  <button 
                    onClick={() => navigate(`/story/${story._id}/tasks`)} 
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 shadow"
                  >
                    View Tasks
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StoryDetails;
