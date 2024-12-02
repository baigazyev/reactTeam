const getUsersFromLocalStorage = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];  
  };
  
  const saveUsersToLocalStorage = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
  };
  
  export const getAllUsers = () => {
    return getUsersFromLocalStorage();
  };
  
  export const registerUser = (userData) => {
    const users = getUsersFromLocalStorage();
    const existingUser = users.find((user) => user.email === userData.email);
    if (existingUser) {
      return null; 
    }
    users.push(userData);
    saveUsersToLocalStorage(users); 
    return userData;
  };
  
  export const loginUser = (email, password) => {
    const users = getUsersFromLocalStorage();
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

  
  