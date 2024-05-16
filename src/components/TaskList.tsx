import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import TaskItem from './TaskItem';

interface TaskListProps {
  storyId: string;
}

const TaskList: React.FC<TaskListProps> = ({ storyId }) => {
  const tasks = useSelector((state: RootState) => state.task.tasks.filter(task => task.storyId === storyId));
  const [filter, setFilter] = useState<'all' | 'todo' | 'doing' | 'done'>('all');

  const filteredTasks = tasks.filter(task => filter === 'all' || task.status === filter);

  return (
    <div>
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('todo')}>To Do</button>
        <button onClick={() => setFilter('doing')}>Doing</button>
        <button onClick={() => setFilter('done')}>Done</button>
      </div>
      {filteredTasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
