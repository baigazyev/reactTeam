import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Profile from '../components/Profile';

jest.mock('../services/authService', () => ({
  getActiveUser: jest.fn(),
}));

describe('Profile Component', () => {
  it('отображает имя пользователя и проверяет наличие @gmail.com', () => {
    const mockUser = {
      id: 1,
      username: 'testuser@gmail.com',
    };

    const { getActiveUser } = require('../services/authService');
    getActiveUser.mockReturnValue(mockUser);

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    const usernameElement = screen.getByText(/Имя пользователя:/i);
    expect(usernameElement).toBeInTheDocument();
    expect(usernameElement).toHaveTextContent('testuser@gmail.com');

    expect(usernameElement.textContent).toContain('@gmail.com');
  });

  it('показывает сообщение о входе, если пользователь не авторизован', () => {
    const { getActiveUser } = require('../services/authService');
    getActiveUser.mockReturnValue(null);

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    const loginPrompt = screen.getByText(/Войдите в свой аккаунт/i);
    expect(loginPrompt).toBeInTheDocument();
  });
});
