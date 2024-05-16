import React from 'react';
import { useDispatch } from 'react-redux';
import Task from '../models/Task';
import { deleteTask, setEditingTask, updateTask } from '../store/slices/taskSlice';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(setEditingTask(task));
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const handleAssignUser = (userId: string) => {
    dispatch(updateTask({ ...task, ownerId: userId, status: 'doing', startDate: new Date() }));
  };

  const handleMarkAsDone = () => {
    dispatch(updateTask({ ...task, status: 'done', endDate: new Date() }));
  };

  return (
    <div>
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.status}</p>
      <p>Estimated Time: {task.estimatedTime} hours</p>
      <p>Creation Date: {task.creationDate.toLocaleDateString()}</p>
      {task.startDate && <p>Start Date: {task.startDate.toLocaleDateString()}</p>}
      {task.endDate && <p>End Date: {task.endDate.toLocaleDateString()}</p>}
      <p>Owner: {task.ownerId || 'Unassigned'}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      {task.status === 'todo' && (
        <button onClick={() => handleAssignUser('user-id')}>Assign to User</button>
      )}
      {task.status === 'doing' && (
        <button onClick={handleMarkAsDone}>Mark as Done</button>
      )}
    </div>
  );
};

export default TaskItem;
