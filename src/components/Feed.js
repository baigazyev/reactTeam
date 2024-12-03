import React, { useEffect, useMemo, useState } from 'react';
import { List, Avatar, Card, Typography } from 'antd';
import { getAllUsers, getActiveUser } from '../services/authService';
import { Link } from 'react-router-dom';
import './Feed.css';

const { Title } = Typography;

const Feed = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all');
  
  const currentUser = getActiveUser();

  const filteredUsers = useMemo(() => {
    if (filter === 'all') return users.filter(user => user.id !== currentUser.id);
    return users.filter(user => user.role === filter && user.id !== currentUser.id);
  }, [users, filter, currentUser]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch('http://localhost:5000/users');
      const data = await response.json();
      setUsers(data);
    };
    getUsers();
  }, []);

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
              <Link to={`/users/${user.id}`} >
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
              </Link>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default Feed;
