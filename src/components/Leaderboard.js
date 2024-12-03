import React, { useEffect, useState, useMemo } from 'react';
import { List, Card, Statistic, Spin } from 'antd';
import { getAllUsers } from '../services/authService'; 

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers);
      } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const sortedUsers = useMemo(() => {
    return users.sort((a, b) => b.habits.length - a.habits.length);
  }, [users]);

  if (loading) {
    return <Spin size="large" tip="Загрузка..." />;
  }

  if (!sortedUsers.length) {
    return <p>Нет данных о пользователях.</p>;
  }

  return (
    <div>
      <h2>Таблица лидеров</h2>
      <List
        bordered
        dataSource={sortedUsers}
        renderItem={(user, index) => (
          <List.Item key={index}>
            <Card
              title={user.username}
              style={{ width: 300, marginBottom: 20 }}
            >
              <Statistic title="Количество привычек" value={user.habits.length} />
              <p>Ранг: {user.habits.length >= 50 ? 'Бриллиант' :
                          user.habits.length >= 20 ? 'Золото' :
                          user.habits.length >= 10 ? 'Серебро' : 'Бронза'}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Leaderboard;
