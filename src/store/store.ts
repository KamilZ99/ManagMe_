import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './slices/projectSlice';
import storyReducer from './slices/storySlice';
import taskReducer from './slices/taskSlice';

const store = configureStore({
  reducer: {
    project: projectReducer,
    story: storyReducer,
    task: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
