
import React, { useMemo, useState } from 'react';
import { List, Avatar, Card, Typography } from 'antd';
import { getAllUsers } from '../services/authService';
import './Feed.css';

const { Title } = Typography;

const Feed = () => {
  const [users, setUsers] = useState(getAllUsers());
  const [filter, setFilter] = useState('all'); // 'all', 'admin', 'user'

  const filteredUsers = useMemo(() => {
    if (filter === 'all') return users;
    return users.filter(user => user.role === filter);
  }, [users, filter]);

  return (
    <div className="feed-container">
      <Title level={2}>Лента пользователей</Title>
      <select onChange={e => setFilter(e.target.value)} value={filter}>
        <option value="all">All</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
      {filteredUsers.length === 0 ? (
        <p>Нет пользователей для отображения.</p>
      ) : (
        <List
          itemLayout="vertical"
          dataSource={filteredUsers}
          renderItem={(user) => (
            <List.Item key={user.username}>
              <Card
                hoverable
                cover={
                  <Avatar size={64} style={{ backgroundColor: '#87d068' }}>
                    {user.username[0]}
                  </Avatar>
                }
              >
                <List.Item.Meta title={user.username} />
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default Feed;
