import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// 懒加载 Login 页面
const Login = lazy(() => import('../pages/Login/loginIndex.jsx'));
const Home = lazy(() => import('../pages/Home/homeIndex.jsx'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" />, // 默认跳转到 /login
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/home',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    ),
  }
]);