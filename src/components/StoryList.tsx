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
    <div>
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('todo')}>To Do</button>
        <button onClick={() => setFilter('doing')}>Doing</button>
        <button onClick={() => setFilter('done')}>Done</button>
      </div>
      {filteredStories.map(story => (
        <StoryItem key={story.id} story={story} />
      ))}
    </div>
  );
};

export default StoryList;
