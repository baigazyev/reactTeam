
import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getActiveUser } from '../services/authService';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(getActiveUser());

  const updateUser = useCallback((field, value) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: value,
    }));
  }, []);

  if (!user) {
    return (
      <div>
        <p>Войдите в свой аккаунт</p>
        <Link to="/login">Вход</Link>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2>Профиль</h2>
      <p>Имя пользователя: {user.username}</p>
      <p>Возраст: {user.age}</p>
      <button onClick={() => updateUser('age', user.age + 1)}>Увеличить возраст</button>
    </div>
  );
};

export default Profile;
