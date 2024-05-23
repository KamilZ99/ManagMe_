import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Task from '../models/Task';
import { deleteTask, setEditingTask, updateTask } from '../store/slices/taskSlice';
import TaskDetailsModal from './TaskDetailsModal';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);

  let startX: number, startY: number;

  const handleMouseDown = (e: React.MouseEvent) => {
    startX = e.clientX;
    startY = e.clientY;
  };

  const handleClick = (e: React.MouseEvent) => {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 5) {
      setModalOpen(true);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setEditingTask(task));
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteTask(task.id));
  };

  const handleAssignUser = (userId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(updateTask({ ...task, ownerId: userId, status: 'doing', startDate: new Date() }));
  };

  const handleMarkAsDone = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(updateTask({ ...task, status: 'done', endDate: new Date() }));
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <div
        className="bg-white shadow-md rounded-lg p-6 mb-4 cursor-pointer"
        onMouseDown={handleMouseDown}
        onClick={handleClick}
      >
        <h3 className="text-xl font-semibold mb-2">{task.name}</h3>
        <p className="text-gray-700 mb-2">{task.description}</p>
        <p className="text-sm text-gray-500 mb-1">Priority: <span className="font-medium">{task.priority}</span></p>
        <p className="text-sm text-gray-500 mb-1">Status: <span className={`font-medium ${task.status === 'done' ? 'text-green-500' : 'text-yellow-500'}`}>{task.status}</span></p>
        <p className="text-sm text-gray-500 mb-1">Estimated Time: <span className="font-medium">{task.estimatedTime} hours</span></p>
        <p className="text-sm text-gray-500 mb-1">Creation Date: <span className="font-medium">{task.creationDate.toLocaleDateString()}</span></p>
        {task.startDate && <p className="text-sm text-gray-500 mb-1">Start Date: <span className="font-medium">{task.startDate.toLocaleDateString()}</span></p>}
        {task.endDate && <p className="text-sm text-gray-500 mb-1">End Date: <span className="font-medium">{task.endDate.toLocaleDateString()}</span></p>}
        <p className="text-sm text-gray-500 mb-4">Owner: <span className="font-medium">{task.ownerId || 'Unassigned'}</span></p>
        <div className="flex space-x-2">
          <button 
            onClick={handleEdit} 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
          >
            Edit
          </button>
          <button 
            onClick={handleDelete} 
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
          >
            Delete
          </button>
          {task.status === 'todo' && (
            <button 
              onClick={(e) => handleAssignUser('user-id', e)} 
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600"
            >
              Assign to User
            </button>
          )}
          {task.status === 'doing' && (
            <button 
              onClick={handleMarkAsDone} 
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
            >
              Mark as Done
            </button>
          )}
        </div>
      </div>
      {isModalOpen && <TaskDetailsModal task={task} onClose={handleCloseModal} />}
    </div>
  );
};

export default TaskItem;
