export const addHabit = async (currentUser, newHabit) => {
    try {
      const usersResponse = await fetch('http://localhost:5000/users');
      const users = await usersResponse.json();
  
      const userIndex = users.findIndex(user => user.username === currentUser.username);
  
      if (userIndex !== -1) {
        if (newHabit.id) {
          const habitWithDate = {
            ...newHabit,
            date: new Date().toISOString(),
            userId: users[userIndex].id
          };
  
          const habitResponse = await fetch(`http://localhost:5000/habits/${newHabit.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(habitWithDate)
          });
  
          if (habitResponse.ok) {
            const updatedHabit = await habitResponse.json();
            const habitIndex = users[userIndex].habits.findIndex(habit => habit.id === newHabit.id);
            users[userIndex].habits[habitIndex] = updatedHabit.id; // Update the habit with new data
            
            const response = await fetch(`http://localhost:5000/users/${users[userIndex].id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(users[userIndex])
            });
  
            if (response.ok) {
              const updatedUser = await response.json();
              localStorage.setItem('activeUser', JSON.stringify(updatedUser));
              return updatedUser;
            } else {
              console.error('Ошибка при обновлении данных пользователя');
              return null;
            }
          } else {
            console.error('Ошибка при обновлении привычки');
            return null;
          }
        } else {
          const habitWithDate = {
            ...newHabit,
            date: new Date().toISOString(),
            userId: users[userIndex].id
          };
  
          const habitResponse = await fetch('http://localhost:5000/habits', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(habitWithDate)
          });
  
          if (habitResponse.ok) {
            const newHabitData = await habitResponse.json();
            users[userIndex].habits = [...users[userIndex].habits, newHabitData.id];
  
            const response = await fetch(`http://localhost:5000/users/${users[userIndex].id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(users[userIndex])
            });
  
            if (response.ok) {
              const updatedUser = await response.json();
              localStorage.setItem('activeUser', JSON.stringify(updatedUser));
              return updatedUser;
            } else {
              console.error('Ошибка при обновлении данных пользователя');
              return null;
            }
          } else {
            console.error('Ошибка при создании новой привычки');
            return null;
          }
        }
      } else {
        console.error("Пользователь не найден");
        return null;
      }
    } catch (error) {
      console.error("Ошибка при взаимодействии с API:", error);
      return null;
    }
  };
  
  export const deleteHabit = async (currentUser, habitId) => {
    try {
      const usersResponse = await fetch('http://localhost:5000/users');
      const users = await usersResponse.json();
  
      const userIndex = users.findIndex(user => user.username === currentUser.username);
  
      if (userIndex !== -1) {
        const updatedHabits = users[userIndex].habits.filter(habitId => habitId !== habitId);
  
        users[userIndex].habits = updatedHabits;
  
        const response = await fetch(`http://localhost:5000/users/${users[userIndex].id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(users[userIndex])
        });
  
        if (response.ok) {
          const updatedUser = await response.json();
          localStorage.setItem('activeUser', JSON.stringify(updatedUser));
        } else {
          console.error('Ошибка при обновлении данных пользователя');
        }
  
        const habitResponse = await fetch(`http://localhost:5000/habits/${habitId}`, {
          method: 'DELETE'
        });
  
        if (habitResponse.ok) {
          console.log('Привычка успешно удалена');
        } else {
          console.error('Ошибка при удалении привычки');
        }
      } else {
        console.error('Пользователь не найден');
      }
    } catch (error) {
      console.error('Ошибка при взаимодействии с API:', error);
    }
  };
  
