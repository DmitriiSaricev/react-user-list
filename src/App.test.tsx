import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { act } from 'react';
import App from './App';
import * as useUsersHook from './hooks/useUsers/useUsers';
import { User } from './types/user';

// Fully typed mock user matching the User interface
const mockUsers: User[] = [
  {
    gender: 'male',
    name: { title: 'Mr', first: 'John', last: 'Doe' },
    location: {
      street: { number: 123, name: 'Main Street' },
      city: 'Berlin',
      state: 'Berlin',
      country: 'Germany',
      postcode: '10115',
      coordinates: { latitude: '52.52', longitude: '13.405' },
      timezone: { offset: '+01:00', description: 'Berlin Time' },
    },
    email: 'john.doe@example.com',
    login: {
      uuid: 'abc123',
      username: 'johndoe',
      password: 'pass',
      salt: 'salt',
      md5: 'md5hash',
      sha1: 'sha1hash',
      sha256: 'sha256hash',
    },
    dob: { date: '1990-01-01T00:00:00.000Z', age: 34 },
    registered: { date: '2015-01-01T00:00:00.000Z', age: 9 },
    phone: '123456789',
    cell: '987654321',
    id: { name: 'SSN', value: '123-45-6789' },
    picture: {
      large: 'https://example.com/avatar.jpg',
      medium: '',
      thumbnail: '',
    },
    nat: 'DE',
  },
];

// Mock useUsers hook globally
jest.spyOn(useUsersHook, 'useUsers').mockReturnValue({
  users: mockUsers,
  isLoading: false,
  isError: null,
});

describe('App', () => {
  it('renders user card and opens modal on click', async () => {
    await act(async () => {
      render(<App />);
    });

    // Assert user card is rendered
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();

    // Click on card to open modal
    await act(async () => {
      fireEvent.click(screen.getByText(/John Doe/i));
    });

    const dialog = screen.getByRole('dialog');

    // Assert modal content
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText(/john.doe@example.com/i)).toBeInTheDocument();
    expect(within(dialog).getByText(/Berlin, Germany/i)).toBeInTheDocument();

    // Close the modal
    await act(async () => {
      fireEvent.click(within(dialog).getByRole('button', { name: /close/i }));
    });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders loader and error fallback states', async () => {
    // Mock loading state
    jest.spyOn(useUsersHook, 'useUsers').mockReturnValueOnce({
      users: [],
      isLoading: true,
      isError: null,
    });

    await act(async () => {
      render(<App />);
    });

    // Assert loader presence (use role if defined)
    expect(screen.getByRole('status')).toBeInTheDocument();

    // Mock error state
    jest.spyOn(useUsersHook, 'useUsers').mockReturnValueOnce({
      users: [],
      isLoading: false,
      isError: 'Failed to load users',
    });

    await act(async () => {
      render(<App />);
    });

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
