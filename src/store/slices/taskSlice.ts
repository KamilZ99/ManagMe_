import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Task from '../../models/Task';
import TaskApi from '../../api/TaskApi';

interface TaskState {
  tasks: Task[];
  editingTask: Task | null;
}

const initialState: TaskState = {
  tasks: TaskApi.getTasks(),
  editingTask: null,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      TaskApi.addTask(action.payload);
      state.tasks = TaskApi.getTasks();
    },
    updateTask(state, action: PayloadAction<Task>) {
      TaskApi.updateTask(action.payload);
      state.tasks = TaskApi.getTasks();
    },
    deleteTask(state, action: PayloadAction<string>) {
      TaskApi.deleteTask(action.payload);
      state.tasks = TaskApi.getTasks();
    },
    setEditingTask(state, action: PayloadAction<Task | null>) {
      state.editingTask = action.payload;
    },
  },
});

export const { addTask, updateTask, deleteTask, setEditingTask } = taskSlice.actions;

export default taskSlice.reducer;
