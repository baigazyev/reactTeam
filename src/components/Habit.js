import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, List, Space } from 'antd';
import { getActiveUser } from '../services/authService';
import { addHabit, deleteHabit } from '../services/habitService';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Habit = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [habits, setHabits] = useState([]);
  const [editingHabit, setEditingHabit] = useState(null);

  const fetchHabits = async () => {
    const currentUser = getActiveUser();
    if (!currentUser) {
      message.error('Пожалуйста, войдите в систему, чтобы увидеть свои привычки.');
      return;
    }

    const habitsResponse = await fetch(`http://localhost:5000/habits?userId=${currentUser.id}`);
    const habitsData = await habitsResponse.json();
    setHabits(habitsData);
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleSubmit = async () => {
    const currentUser = getActiveUser();
    if (!currentUser) {
      message.error('Пожалуйста, войдите в систему, чтобы добавить привычку.');
      return;
    }

    const newHabit = { title, description };

    if (editingHabit) {
      const updatedHabit = { ...editingHabit, title, description };
      await addHabit(currentUser, updatedHabit);
      message.success('Привычка успешно обновлена!');
      setEditingHabit(null);
    } else {
      await addHabit(currentUser, newHabit);
      message.success('Привычка успешно добавлена!');
    }

    setTitle('');
    setDescription('');
    fetchHabits(); 
  };

  const handleDelete = async (habitId) => {
    const currentUser = getActiveUser();
    if (!currentUser) {
      message.error('Пожалуйста, войдите в систему, чтобы удалить привычку.');
      return;
    }

    await deleteHabit(currentUser, habitId);
    message.success('Привычка успешно удалена!');
    fetchHabits();
  };

  const handleEdit = (habit) => {
    setEditingHabit(habit);
    setTitle(habit.title);
    setDescription(habit.description);
  };

  return (
    <div>
      <h2>{editingHabit ? 'Редактировать привычку' : 'Добавить новую привычку'}</h2>
      <Form onFinish={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
        <Form.Item
          label="Название привычки"
          name="title"
          rules={[{ required: true, message: 'Пожалуйста, введите название привычки!' }]}
        >
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>

        <Form.Item label="Описание" name="description">
          <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editingHabit ? 'Обновить привычку' : 'Добавить привычку'}
          </Button>
        </Form.Item>
      </Form>

      <h3>Ваши Привычки</h3>
      {habits.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={habits}
          renderItem={(habit) => (
            <List.Item
              actions={[
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(habit)}
                />,
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(habit.id)}
                />
              ]}
            >
              <List.Item.Meta
                title={habit.title}
                description={habit.description}
              />
            </List.Item>
          )}
        />
      ) : (
        <p>У вас нет привычек, добавьте их!</p>
      )}
    </div>
  );
};

export default Habit;
