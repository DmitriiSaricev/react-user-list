import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filters from './Filters';

describe('Filters component', () => {
  const mockSearchChange = jest.fn();
  const mockSortChange = jest.fn();

  beforeEach(() => {
    render(
      <Filters
        search='test'
        onSearchChange={mockSearchChange}
        sort='name-asc'
        onSortChange={mockSortChange}
      />
    );
  });

  it('renders heading and inputs', () => {
    expect(screen.getByText(/Filter users/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search by name or email/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('calls onSearchChange when typing in input', () => {
    const input = screen.getByPlaceholderText(/Search by name or email/i);
    fireEvent.change(input, { target: { value: 'alex' } });
    expect(mockSearchChange).toHaveBeenCalledWith('alex');
  });

  it('calls onSortChange when selecting option', () => {
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'email-desc' } });
    expect(mockSortChange).toHaveBeenCalledWith('email-desc');
  });
});
