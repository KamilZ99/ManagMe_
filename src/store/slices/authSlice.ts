import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuthenticated: false },
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    checkAuth(state) {
      const token = localStorage.getItem('token');
      state.isAuthenticated = !!token; // Jeśli token istnieje, ustaw isAuthenticated na true
    }
  }
});

export const { login, logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;
