import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { addHabitToUser, getActiveUser } from '../services/authService';

const AddHabit = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    const currentUser = getActiveUser();
    if (!currentUser) {
      message.error('Пожалуйста, войдите в систему, чтобы добавить привычку.');
      return;
    }

    const newHabit = { title, description };

    console.log('Добавляем привычку для пользователя:', currentUser.username);
    
    addHabitToUser(currentUser, newHabit); 
    message.success('Привычка успешно добавлена!');
    
    setTitle('');
    setDescription('');
  };

  return (
    <div>
      <h2>Добавить новую привычку</h2>
      <Form onFinish={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
        <Form.Item
          label="Название привычки"
          name="title"
          rules={[{ required: true, message: 'Пожалуйста, введите название привычки!' }]}
        >
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Описание"
          name="description"
        >
          <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">Добавить привычку</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddHabit;
