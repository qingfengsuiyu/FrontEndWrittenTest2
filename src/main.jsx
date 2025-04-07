import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'; // 引入 RouterProvider
import { router } from './router/index.jsx'; // 引入路由配置
import { Provider } from 'react-redux'; // 引入 Provider
import { store } from './redux/store'; // 引入 Redux store
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* 包裹整个应用 */}
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1890ff', // 主题色
          },
        }}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  </StrictMode>,
);
