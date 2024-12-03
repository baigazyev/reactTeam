import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UserPage.css';

const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(`http://localhost:5000/users/${id}`);
        const userData = await userResponse.json();
        setUser(userData);

        const habitsResponse = await fetch(`http://localhost:5000/habits?userId=${id}`);
        const habitsData = await habitsResponse.json();
        setHabits(habitsData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="user-page-container">
      <div className="user-info">
        <h2>{user.username}'s Profile</h2>
      </div>

      <div className="user-habits">
        <h3>Habits</h3>
        <ul>
          {habits.length > 0 ? (
            habits.map(habit => (
              <li key={habit.id}>
                <strong>{habit.title}</strong>: {habit.description}
                <br />
                <small>Added on: {new Date(habit.date).toLocaleDateString()}</small>
              </li>
            ))
          ) : (
            <p>No habits added yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserPage;
