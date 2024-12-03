const API_URL = 'http://localhost:5000';

export const getUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  return response.json();
};

export const addUser = async (user) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  return response.json();
};

export const updateUser = async (id, updates) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });
  return response.json();
};

export const deleteUser = async (id) => {
  await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
};
