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
  const [status, setStatus] = useState<'todo' | 'doing' | 'done'>(editingStory ? editingStory.status : 'todo');

  useEffect(() => {
    if (editingStory) {
      setName(editingStory.name);
      setDescription(editingStory.description);
      setPriority(editingStory.priority);
      setStatus(editingStory.status);
    }
  }, [editingStory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStory) {
      dispatch(updateStory({ ...editingStory, name, description, priority, status }));
    } else {
      dispatch(addStory({ id: uuidv4(), name, description, priority, projectId, creationDate: new Date(), status, ownerId: '' }));
    }
    setName('');
    setDescription('');
    setPriority('low');
    setStatus('todo');
    dispatch(setEditingStory(null));
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value as 'low' | 'medium' | 'high');
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as 'todo' | 'doing' | 'done');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-4 animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4">Create New Story</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Story Name 📖
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Story Name"
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Story Description 📝
        </label>
        <textarea
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Story Description"
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
          Priority 🚀
        </label>
        <select
          id="priority"
          value={priority}
          onChange={handlePriorityChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
          Status 📈
        </label>
        <select
          id="status"
          value={status}
          onChange={handleStatusChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="todo">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {editingStory ? 'Update' : 'Add'} Story
        </button>
      </div>
    </form>
  );
};

export default StoryForm;
