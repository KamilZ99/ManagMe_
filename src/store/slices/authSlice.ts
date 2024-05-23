// slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  email: string;
  username: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    checkAuth(state) {
      const token = localStorage.getItem('token');
      if (token) {
        // Możesz tutaj dodać logikę do weryfikacji tokena i ustawienia użytkownika
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
      }
    }
  }
});

export const { login, logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;
