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
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Task Name" required />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Task Description" required />
      <select value={priority} onChange={e => setPriority(e.target.value as 'low' | 'medium' | 'high')}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input type="number" value={estimatedTime} onChange={e => setEstimatedTime(Number(e.target.value))} placeholder="Estimated Time (hours)" required />
      <select value={ownerId} onChange={e => setOwnerId(e.target.value)}>
        <option value="">Select Owner</option>
        <option value="devops">DevOps</option>
        <option value="developer">Developer</option>
      </select>
      <select value={status} onChange={e => {
        const newStatus = e.target.value as 'todo' | 'doing' | 'done';
        setStatus(newStatus);
        if (newStatus === 'doing') {
          setStartDate(new Date());
        } else if (newStatus === 'done') {
          setEndDate(new Date());
        }
      }}>
        <option value="todo">To Do</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
      </select>
      <button type="submit">{editingTask ? 'Update' : 'Add'} Task</button>
    </form>
  );
};

export default TaskForm;
