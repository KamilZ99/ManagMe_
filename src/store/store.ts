import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './slices/projectSlice';
import storyReducer from './slices/storySlice';
import taskReducer from './slices/taskSlice';
import authReducer, { login, logout, checkAuth } from './slices/authSlice'; // Import authReducer oraz akcje login, logout i checkAuth

const store = configureStore({
  reducer: {
    project: projectReducer,
    story: storyReducer,
    task: taskReducer,
    auth: authReducer, // Dodanie authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export { login, logout, checkAuth }; // Eksportowanie akcji login, logout i checkAuth
export default store;
