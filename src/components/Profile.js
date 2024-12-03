import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getActiveUser } from '../services/authService';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(getActiveUser());
  const [habits, setUserHabits] = useState([]);

  const updateUser = useCallback((field, value) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: value,
    }));
  }, []);

  useEffect(() => {
    const getHabits = async () => {
      const response = await fetch('http://localhost:5000/habits');
      const data = await response.json();
      const userData = data.filter((habit) => habit.userId === user.id);
      setUserHabits(userData);
    };
    if (user) {
      getHabits();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="profile-login-prompt">
        <p>Войдите в свой аккаунт, чтобы увидеть профиль.</p>
        <Link to="/login" className="btn-link">Войти</Link>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Профиль</h2>
        <p>Имя пользователя: <span className="username">{user.username}</span></p>
      </div>

      <div className="habits-section">
        <h3>Ваши Привычки</h3>
        {habits.length > 0 ? (
          <ul className="habit-list">
            {habits.map((habit) => (
              <li className="habit-item" key={habit.id}>
                <div className="habit-title">
                  <strong>{habit.title}</strong>
                </div>
                <div className="habit-description">
                  <p>{habit.description}</p>
                  <p><small>Дата добавления: {new Date(habit.date).toLocaleDateString()}</small></p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>У вас нет привычек, добавьте их!</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
