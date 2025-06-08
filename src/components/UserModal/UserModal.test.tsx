import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserModal from './UserModal';
import { User } from '../../types/user';

const mockUser = {
  name: { first: 'Alex', last: 'Johnson' },
  email: 'alex.johnson@example.com',
  phone: '+123456789',
  location: { city: 'Berlin', country: 'Germany' },
  picture: { large: 'https://example.com/avatar.jpg' },
  login: { uuid: '1234' },
} as User;

describe('UserModal', () => {
  it('renders user details when open', () => {
    render(<UserModal user={mockUser} isOpen={true} onClose={jest.fn()} />);

    expect(screen.getByText(/Alex Johnson/i)).toBeInTheDocument();
    expect(screen.getByText(/alex.johnson@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/\+123456789/i)).toBeInTheDocument();
    expect(screen.getByText(/Berlin, Germany/i)).toBeInTheDocument();
  });

  it('calls onClose when "Close" button is clicked', () => {
    const handleClose = jest.fn();
    render(<UserModal user={mockUser} isOpen={true} onClose={handleClose} />);

    const button = screen.getByRole('button', { name: /close/i });
    fireEvent.click(button);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
