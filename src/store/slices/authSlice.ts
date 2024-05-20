import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  email: string;
  // dodaj inne pola, które są potrzebne
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
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    setUser(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    checkAuth(state) {
      const token = localStorage.getItem('token');
      state.isAuthenticated = !!token;
    }
  }
});

export const { login, logout, setUser, checkAuth } = authSlice.actions;
export default authSlice.reducer;
