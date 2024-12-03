  export const getAllUsers = async () => {
    const response = await fetch('http://localhost:5000/users')
    const data = await response.json()
    return data
  };
  
  export const registerUser = async (userData) => {
    const users = await getAllUsers();
    const existingUser = users.find((user) => user.email === userData.email);
  
    if (existingUser) {
      console.error('Пользователь с таким email уже существует');
      return null;
    }
  
    const response = await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
  
    if (response.ok) {
      return userData; 
    }
    return null;
  };
  
  
  export const loginUser = async (email, password) => {
    const users = await getAllUsers(); 
    const user = users.find((user) => user.email === email && user.password === password);
  
    if (user) {
      localStorage.setItem('activeUser', JSON.stringify(user));
      return user; 
    }  
    return null;
  };
  
  
  export const getActiveUser = () => {
    const activeUser = localStorage.getItem('activeUser');
    return activeUser ? JSON.parse(activeUser) : null;
  };
  
  export const addHabitToUser = (currentUser, newHabit) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
  
    const userIndex = users.findIndex(user => user.username === currentUser.username);
  
    if (userIndex !== -1) {
      users[userIndex].habits = [...users[userIndex].habits, newHabit];
  
      localStorage.setItem('users', JSON.stringify(users));
  
      localStorage.setItem('activeUser', JSON.stringify(users[userIndex]));
    } else {
      console.error("Пользователь не найден");
    }
  };

  
  