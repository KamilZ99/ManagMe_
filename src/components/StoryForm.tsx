import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addStory, updateStory, setEditingStory } from '../store/slices/storySlice';
import { v4 as uuidv4 } from 'uuid';

interface StoryFormProps {
  projectId: string;
}

const StoryForm: React.FC<StoryFormProps> = ({ projectId }) => {
  const dispatch = useDispatch();
  const editingStory = useSelector((state: RootState) => state.story.editingStory);
  const [name, setName] = useState(editingStory ? editingStory.name : '');
  const [description, setDescription] = useState(editingStory ? editingStory.description : '');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(editingStory ? editingStory.priority : 'low');

  useEffect(() => {
    if (editingStory) {
      setName(editingStory.name);
      setDescription(editingStory.description);
      setPriority(editingStory.priority);
    }
  }, [editingStory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStory) {
      dispatch(updateStory({ ...editingStory, name, description, priority }));
    } else {
      dispatch(addStory({ id: uuidv4(), name, description, priority, projectId, creationDate: new Date(), status: 'todo', ownerId: '' }));
    }
    setName('');
    setDescription('');
    setPriority('low');
    dispatch(setEditingStory(null));
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value as 'low' | 'medium' | 'high');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Story Name" required />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Story Description" required />
      <select value={priority} onChange={handlePriorityChange}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">{editingStory ? 'Update' : 'Add'} Story</button>
    </form>
  );
};

export default StoryForm;
