// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// 尝试从localStorage获取用户信息
const loadUserFromStorage = () => {
  try {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.error('从localStorage加载用户信息失败:', error);
    return null;
  }
};

const initialState = {
  userInfo: loadUserFromStorage(),
  isLoggedIn: !!loadUserFromStorage()
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload;
      state.isLoggedIn = true;

      // 将用户信息保存到localStorage
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      state.isLoggedIn = false;

      // 从localStorage中移除用户信息
      localStorage.removeItem('userInfo');
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;