import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = loginUser(email, password);
    if (user) {
      message.success('Успешный вход в систему!');
      navigate('/profile'); 
    } else {
      message.error('Неверные учетные данные');
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      <Form onFinish={handleLogin} style={{ maxWidth: '500px', margin: '0 auto' }}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Пожалуйста, введите email!' }]}
        >
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
        >
          <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
