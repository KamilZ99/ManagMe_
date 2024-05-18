import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Story from '../models/Story';
import { deleteStory, setEditingStory } from '../store/slices/storySlice';

interface StoryItemProps {
  story: Story;
}

const StoryItem: React.FC<StoryItemProps> = ({ story }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = () => {
    dispatch(setEditingStory(story));
  };

  const handleDelete = () => {
    dispatch(deleteStory(story.id));
  };

  const handleViewTasks = () => {
    navigate(`/stories/${story.id}/tasks`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{story.name}</h3>
      <p className="text-gray-700 mb-2">{story.description}</p>
      <p className="text-sm text-gray-500 mb-1">
        Priority: <span className="font-medium capitalize">{story.priority}</span>
      </p>
      <p className="text-sm text-gray-500 mb-4">
        Status: <span className={`font-medium ${story.status === 'done' ? 'text-green-500' : story.status === 'doing' ? 'text-yellow-500' : 'text-red-500'}`}>{story.status}</span>
      </p>
      <div className="flex space-x-2">
        <button 
          onClick={handleEdit} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
          onClick={handleViewTasks} 
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          View Tasks
        </button>
      </div>
    </div>
  );
};

export default StoryItem;
