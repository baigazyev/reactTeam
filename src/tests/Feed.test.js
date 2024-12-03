import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Feed from '../components/Feed';
import { getActiveUser } from '../services/authService';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../services/authService', () => ({
  getActiveUser: jest.fn(),
}));

beforeEach(() => {
  jest.resetAllMocks();
  global.fetch = jest.fn();
});

describe('Feed Component', () => {
  it('должен отображать список пользователей и фильтровать их', async () => {
    getActiveUser.mockReturnValue({ id: 1, username: 'current_user' });

    const mockUsers = [
      { id: 1, username: 'current_user', role: 'user' },
      { id: 2, username: 'admin_user', role: 'admin' },
      { id: 3, username: 'regular_user', role: 'user' },
    ];

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockUsers),
    });

    render(
      <Router>
        <Feed />
      </Router>
    );

    expect(screen.getByText('Лента пользователей')).toBeInTheDocument();
    expect(screen.getByText('Нет пользователей для отображения.')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('admin_user')).toBeInTheDocument();
      expect(screen.getByText('regular_user')).toBeInTheDocument();
      expect(screen.queryByText('current_user')).not.toBeInTheDocument(); // Текущий пользователь не должен отображаться
    });

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'admin' } });
    expect(screen.getByText('Нет пользователей для отображения.')).not.toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('admin_user')).toBeInTheDocument();
      expect(screen.queryByText('regular_user')).not.toBeInTheDocument();
    });
  });

  it('должен отображать сообщение, если нет пользователей', async () => {
    getActiveUser.mockReturnValue({ id: 1, username: 'current_user' });

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce([]),
    });

    render(
      <Router>
        <Feed />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Нет пользователей для отображения.')).toBeInTheDocument();
    });
  });
});
