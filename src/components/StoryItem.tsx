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
    <div>
      <h3>{story.name}</h3>
      <p>{story.description}</p>
      <p>Priority: {story.priority}</p>
      <p>Status: {story.status}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleViewTasks}>View Tasks</button>
    </div>
  );
};

export default StoryItem;
