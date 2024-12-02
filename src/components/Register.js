import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    const userData = { username, email, password, habits: [] };
    const registeredUser = registerUser(userData);
    if (registeredUser) {
      message.success('Регистрация успешна!');
      navigate('/login'); 
    } else {
      message.error('Пользователь с таким email уже существует!');
    }
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <Form onFinish={handleRegister} style={{ maxWidth: '500px', margin: '0 auto' }}>
        <Form.Item
          label="Имя пользователя"
          name="username"
          rules={[{ required: true, message: 'Пожалуйста, введите имя пользователя!' }]}
        >
          <Input value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Item>

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
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
