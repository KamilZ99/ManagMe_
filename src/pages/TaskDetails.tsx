import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTasks, createTask, updateTask, deleteTask } from '../api/TaskApi';
import TaskForm from '../components/TaskForm';
import TaskPopup from '../components/TaskPopup';
import { Task } from '../types';

const TaskDetails: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const tasks = await getTasks(storyId!, token);
        setTasks(tasks);
      }
    };
    fetchTasks();
  }, [storyId]);

  const handleCreateOrUpdateTask = async (taskData: { name: string, description: string, priority: string, estimatedTime: number, status: 'todo' | 'doing' | 'done', startDate?: Date, endDate?: Date, ownerId?: string, assignedUserId?: string }) => {
    const token = localStorage.getItem('token');
    if (token) {
      if (editingTask) {
        const updatedTask = await updateTask(editingTask._id, { ...taskData }, token);
        setTasks(tasks.map(task => (task._id === updatedTask._id ? updatedTask : task)));
        setEditingTask(null);
      } else {
        const newTask = await createTask({ ...taskData, storyId: storyId! }, token);
        setTasks([...tasks, newTask]);
      }
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleDeleteTask = async (taskId: string) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await deleteTask(taskId, token);
        setTasks(tasks.filter(task => task._id !== taskId));
        console.log(`Task with ID: ${taskId} successfully deleted`);
      } catch (error) {
        console.error(`Failed to delete task with ID: ${taskId}`, error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#f2f2f2] to-[#EAEAEA] dark:from-gray-800 dark:to-gray-700 flex justify-center items-center py-10">
      <div className="w-5/6 flex space-x-6 h-[80vh] -mt-20">
        <div className="w-1/3 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl h-full flex flex-col overflow-hidden">
          <h1 className="text-m font-bold mb-6 text-black dark:text-white">{editingTask ? 'Edit Task' : 'Create New Task'} 📋</h1>
          <div className="flex-grow overflow-y-auto">
            <TaskForm onSubmit={handleCreateOrUpdateTask} task={editingTask} />
          </div>
        </div>
        <div className="w-2/3 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl h-full flex flex-col">
          <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">Tasks List 📋</h1>
          <div className="kanban-board grid grid-cols-3 gap-4 h-full overflow-auto">
            <div>
              <h2 className="text-lg font-bold mb-2 text-black dark:text-white">To Do</h2>
              {tasks.filter(task => task.status === 'todo').map(task => (
                <div key={task._id} className="bg-gradient-to-r from-[#fbfbfb] to-[#fbfbfb] dark:from-gray-700 dark:to-gray-600 p-4 rounded-3xl shadow-md mb-4">
                  <h3 className="font-bold text-black dark:text-white">Name: {task.name}</h3>
                  <p className="text-gray-700 dark:text-gray-300">Desc: {task.description}</p>
                  <div className="flex space-x-2 mt-4">
                    <button 
                      onClick={() => setSelectedTask(task)} 
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-300 shadow"
                    >
                      Details
                    </button>
                    <button 
                      onClick={() => handleEditTask(task)} 
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition duration-300 shadow"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteTask(task._id)} 
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300 shadow"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-lg font-bold mb-2 text-black dark:text-white">Doing</h2>
              {tasks.filter(task => task.status === 'doing').map(task => (
                <div key={task._id} className="bg-gradient-to-r from-[#F8F9FA] to-[#EAEAEA] dark:from-gray-700 dark:to-gray-600 p-4 rounded-3xl shadow-md mb-4">
                  <h3 className="font-bold text-black dark:text-white">{task.name}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{task.description}</p>
                  <div className="flex space-x-2 mt-4">
                    <button 
                      onClick={() => setSelectedTask(task)} 
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-300 shadow"
                    >
                      Details
                    </button>
                    <button 
                      onClick={() => handleEditTask(task)} 
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition duration-300 shadow"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteTask(task._id)} 
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300 shadow"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-lg font-bold mb-2 text-black dark:text-white">Done</h2>
              {tasks.filter(task => task.status === 'done').map(task => (
                <div key={task._id} className="bg-gradient-to-r from-[#F8F9FA] to-[#EAEAEA] dark:from-gray-700 dark:to-gray-600 p-4 rounded-3xl shadow-md mb-4">
                  <h3 className="font-bold text-black dark:text-white">{task.name}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{task.description}</p>
                  <div className="flex space-x-2 mt-4">
                    <button 
                      onClick={() => setSelectedTask(task)} 
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-300 shadow"
                    >
                      Details
                    </button>
                    <button 
                      onClick={() => handleEditTask(task)} 
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition duration-300 shadow"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteTask(task._id)} 
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300 shadow"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {selectedTask && <TaskPopup task={selectedTask} onClose={() => setSelectedTask(null)} />}
    </div>
  );
};

export default TaskDetails;
