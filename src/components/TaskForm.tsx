import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addTask, updateTask, setEditingTask } from '../store/slices/taskSlice';
import { v4 as uuidv4 } from 'uuid';

interface TaskFormProps {
  storyId: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ storyId }) => {
  const dispatch = useDispatch();
  const editingTask = useSelector((state: RootState) => state.task.editingTask);
  const [name, setName] = useState(editingTask ? editingTask.name : '');
  const [description, setDescription] = useState(editingTask ? editingTask.description : '');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(editingTask ? editingTask.priority : 'low');
  const [estimatedTime, setEstimatedTime] = useState(editingTask ? editingTask.estimatedTime : 0);
  const [ownerId, setOwnerId] = useState(editingTask ? editingTask.ownerId : '');
  const [status, setStatus] = useState<'todo' | 'doing' | 'done'>(editingTask ? editingTask.status : 'todo');
  const [startDate, setStartDate] = useState(editingTask ? editingTask.startDate || undefined : undefined);
  const [endDate, setEndDate] = useState(editingTask ? editingTask.endDate || undefined : undefined);

  useEffect(() => {
    if (editingTask) {
      setName(editingTask.name);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
      setEstimatedTime(editingTask.estimatedTime);
      setOwnerId(editingTask.ownerId || '');
      setStatus(editingTask.status);
      setStartDate(editingTask.startDate || undefined);
      setEndDate(editingTask.endDate || undefined);
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date();
    if (editingTask) {
      dispatch(updateTask({ ...editingTask, name, description, priority, estimatedTime, ownerId, status, startDate, endDate }));
    } else {
      dispatch(addTask({ id: uuidv4(), name, description, priority, storyId, estimatedTime, status, creationDate: currentDate, startDate, endDate, ownerId }));
    }
    setName('');
    setDescription('');
    setPriority('low');
    setEstimatedTime(0);
    setOwnerId('');
    setStatus('todo');
    setStartDate(undefined);
    setEndDate(undefined);
    dispatch(setEditingTask(null));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-4 animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Task Name 📝
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Task Name"
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Task Description 📝
        </label>
        <textarea
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Task Description"
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
          onChange={e => setPriority(e.target.value as 'low' | 'medium' | 'high')}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estimatedTime">
          Estimated Time (hours) ⏱️
        </label>
        <input
          type="number"
          id="estimatedTime"
          value={estimatedTime}
          onChange={e => setEstimatedTime(Number(e.target.value))}
          placeholder="Estimated Time (hours)"
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ownerId">
          Owner 👤
        </label>
        <select
          id="ownerId"
          value={ownerId}
          onChange={e => setOwnerId(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select Owner</option>
          <option value="devops">DevOps</option>
          <option value="developer">Developer</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
          Status 📈
        </label>
        <select
          id="status"
          value={status}
          onChange={e => {
            const newStatus = e.target.value as 'todo' | 'doing' | 'done';
            setStatus(newStatus);
            if (newStatus === 'doing') {
              setStartDate(new Date());
            } else if (newStatus === 'done') {
              setEndDate(new Date());
            }
          }}
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
          {editingTask ? 'Update' : 'Add'} Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
