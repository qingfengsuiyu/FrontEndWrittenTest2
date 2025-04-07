import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // 这里可以添加其他的 reducer
  },
});

export default store;