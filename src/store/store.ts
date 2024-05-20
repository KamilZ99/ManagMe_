import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './slices/projectSlice';
import storyReducer from './slices/storySlice';
import taskReducer from './slices/taskSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    project: projectReducer,
    story: storyReducer,
    task: taskReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { setUser, login, logout, checkAuth } from './slices/authSlice';
export default store;
