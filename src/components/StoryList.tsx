import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import StoryItem from './StoryItem';

interface StoryListProps {
  projectId: string;
}

const StoryList: React.FC<StoryListProps> = ({ projectId }) => {
  const stories = useSelector((state: RootState) => state.story.stories.filter(story => story.projectId === projectId));
  const [filter, setFilter] = useState<'all' | 'todo' | 'doing' | 'done'>('all');

  const filteredStories = stories.filter(story => filter === 'all' || story.status === filter);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md animate-fadeIn">
      <div className="flex space-x-2 mb-4">
        <button 
          onClick={() => setFilter('all')} 
          className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} focus:outline-none`}
        >
          All 📋
        </button>
        <button 
          onClick={() => setFilter('todo')} 
          className={`px-4 py-2 rounded ${filter === 'todo' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} focus:outline-none`}
        >
          To Do 📋
        </button>
        <button 
          onClick={() => setFilter('doing')} 
          className={`px-4 py-2 rounded ${filter === 'doing' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} focus:outline-none`}
        >
          Doing 📋
        </button>
        <button 
          onClick={() => setFilter('done')} 
          className={`px-4 py-2 rounded ${filter === 'done' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} focus:outline-none`}
        >
          Done 📋
        </button>
      </div>
      <div>
        {filteredStories.map(story => (
          <StoryItem key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
};

export default StoryList;
