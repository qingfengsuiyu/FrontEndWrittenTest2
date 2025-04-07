import React from 'react';
import { Form, Input, Button, Checkbox, Card, Typography, message, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/authSlice';
const { Title } = Typography;

const LoginPage = () => {
  const dispatch = useDispatch();

  // 创建表单实例
  const [form] = Form.useForm();

  // 创建状态来跟踪当前表单模式
  const [formMode, setFormMode] = React.useState('login'); // 'login', 'forgot', 'register'

  // (倒计时)
  const [isSendingCode, setIsSendingCode] = React.useState(false);
  const [countdown, setCountdown] = React.useState(30);
  const [isPhoneValid, setIsPhoneValid] = React.useState(false);


  // 表单提交成功处理
  const onFinish = (values) => {
    console.log('表单提交成功:', values);
    message.success('登录成功!');
    const userData = {
      username: values.username,
      // 不要存储敏感信息如密码
      // 可以存储从后端获取的 token 或其他用户信息
      loginTime: new Date().toISOString(),
    };
    dispatch(login(userData));
    message.success('登录成功!');
    form.resetFields(); // 重置表单字段
  };

  // 表单提交注册成功
  const handleRegister = (values) => {
    console.log('注册:', values);

    // 创建用户数据对象
    const userData = {
      username: values.username,
      mobile: values.mobile,
      // 不存储密码
      registerTime: new Date().toISOString(),
    };

    // 分发到Redux
    dispatch(login(userData));

    message.success('注册成功!');
    form.resetFields(); // 重置表单字段
    setFormMode('login'); // 切换到登录模式
  };

  // 表单提交失败处理
  const onFinishFailed = (errorInfo) => {
    console.log('表单提交失败:', errorInfo);
    message.error('请检查输入信息!');
  };

  // 提取的验证规则
  const validationRules = {
    username: [
      { required: true, message: '请输入用户名!' },
      { max: 6, message: '用户名不能超过6位!' },
      {
        pattern: /^[a-zA-Z0-9]+$/,
        message: '用户名只能包含英文字母和数字!'
      }
    ],
    password: [
      { required: true, message: '请输入密码!' },
      { min: 6, message: '密码至少6位!' },
      {
        validator: (_, value) => {
          if (!value) return Promise.resolve();

          const hasUpperCase = /[A-Z]/.test(value);
          const hasLowerCase = /[a-z]/.test(value);
          const hasNumber = /[0-9]/.test(value);
          const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value);

          if (!hasUpperCase) {
            return Promise.reject('密码必须包含至少1个大写字母!');
          }
          if (!hasLowerCase) {
            return Promise.reject('密码必须包含至少1个小写字母!');
          }
          if (!hasNumber) {
            return Promise.reject('密码必须包含至少1个数字!');
          }
          if (!hasSpecialChar) {
            return Promise.reject('密码必须包含至少1个特殊字符!');
          }

          return Promise.resolve();
        }
      }
    ],
    mobile: [
      { required: true, message: '请输入手机号!' },
      {
        pattern: /^1[3-9]\d{9}$/,
        message: '请输入有效的手机号(1开头的11位数字)!'
      }
    ],
    verificationCode: [
      { required: true, message: '请输入验证码!' },
      {
        pattern: /^\d{6}$/,
        message: '验证码必须是6位数字!'
      }
    ]
  };

  // 切换到忘记密码模式
  const switchToForgotPassword = (e) => {
    e.preventDefault();
    form.resetFields(); // 重置表单字段
    setFormMode('forgot');
  };

  // 切换到注册模式
  const switchToRegister = (e) => {
    e.preventDefault();
    form.resetFields(); // 重置表单字段
    setFormMode('register');
  };

  // 切换到登录模式
  const switchToLogin = (e) => {
    e.preventDefault();
    form.resetFields(); // 重置表单字段
    setFormMode('login');
  };

  // 根据模式渲染不同标题
  const renderTitle = () => {
    switch (formMode) {
      case 'forgot':
        return '找回密码';
      case 'register':
        return '快速注册';
      default:
        return '登录';
    }
  };

  // 渲染登录表单
  const renderLoginForm = () => (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          name="username"
          rules={validationRules.username}
          label="用户名"
        >
          <Input placeholder="请输入用户名!" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={validationRules.password}
          label="密码"
        >
          <Input.Password placeholder="请输入密码!" />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>记住我</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" size='middle' style={{ width: '100%' }}>
            登录
          </Button>
        </Form.Item>
      </Form>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#" onClick={switchToForgotPassword}>忘记密码?</a>
        <a href="#" onClick={switchToRegister}>没有账户? 快速注册</a>
      </div>
    </>
  );

  // 渲染找回密码表单
  const renderForgotPasswordForm = () => (
    <>
      <Form
        form={form}
        onFinish={handleRegister}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          name="username"
          rules={validationRules.username}
          label="用户名"
        >
          <Input placeholder="请输入用户名!" />
        </Form.Item>
        <Form.Item
          name="mobile"
          rules={validationRules.mobile}
          label="手机"
        >
          <Input placeholder="请输入手机号" onChange={handlePhoneChange} />
        </Form.Item>
        <Form.Item
          name="VerificationCode"
          rules={validationRules.verificationCode}
          label="验证码">
          <div style={{ display: 'flex' }}>
            <Input placeholder="请输入验证码" />
            <Button
              type="primary"
              style={{ marginLeft: '10px' }}
              disabled={isSendingCode || !isPhoneValid}
              onClick={sendVerificationCode}>
              {isSendingCode ? `${countdown}秒后重新获取` : '获取验证码'}
            </Button>
          </div>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size='middle' style={{ width: '100%' }}>
            注册
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: 'center' }}>
        <a href="#" onClick={switchToLogin}>已有账户? 去登录</a>
      </div>
    </>
  );

  // 渲染注册表单
  const renderRegisterForm = () => (
    <>
      <Form
        form={form}
        onFinish={handleRegister}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          name="username"
          rules={validationRules.username}
          label="用户名"
        >
          <Input placeholder="请输入用户名!" />
        </Form.Item>
        <Form.Item
          name="mobile"
          rules={validationRules.mobile}
          label="手机"
        >
          <Input placeholder="请输入手机号" onChange={handlePhoneChange} />
        </Form.Item>
        <Form.Item
          name="VerificationCode"
          rules={validationRules.verificationCode}
          label="验证码">
          <div style={{ display: 'flex' }}>
            <Input placeholder="请输入验证码" />
            <Button
              type="primary"
              style={{ marginLeft: '10px' }}
              disabled={isSendingCode || !isPhoneValid}
              onClick={sendVerificationCode}>
              {isSendingCode ? `${countdown}秒后重新获取` : '获取验证码'}
            </Button>
          </div>
        </Form.Item>
        <Form.Item
          name="password"
          rules={validationRules.password}
          label="密码"
        >
          <Input.Password placeholder="请输入密码!" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size='middle' style={{ width: '100%' }}>
            注册
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: 'center' }}>
        <a href="#" onClick={switchToLogin}>已有账户? 去登录</a>
      </div>
    </>
  );

  // 根据模式渲染不同表单内容
  const renderForm = () => {
    switch (formMode) {
      case 'forgot':
        return renderForgotPasswordForm();
      case 'register':
        return renderRegisterForm();
      default:
        return renderLoginForm();
    }
  };

  // 倒计时函数
  const sendVerificationCode = () => {
    // 获取表单中的手机号
    const mobile = form.getFieldValue('mobile');

    // 如果没有手机号，则提示用户
    if (!mobile) {
      message.error('请先输入手机号');
      return;
    }

    // 验证手机号是否符合规则
    const mobileRegex = /^1[3-9]\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      message.error('请输入有效的手机号');
      return;
    }

    // 设置倒计时状态
    setIsSendingCode(true);
    setCountdown(30);

    // 模拟发送验证码
    message.success(`验证码已发送至手机号: ${mobile}`);

    // 开始倒计时
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          setIsSendingCode(false);
          return 30;
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const mobileRegex = /^1[3-9]\d{9}$/;
    setIsPhoneValid(mobileRegex.test(value));
  };


  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col xs={20} sm={16} md={12} lg={8} xl={6}>
        <Card style={{ padding: '8px', minHeight: '100px', minWidth: '100px' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '50px' }}>
            {renderTitle()}
          </Title>
          {renderForm()}
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;