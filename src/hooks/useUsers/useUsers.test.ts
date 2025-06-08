import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useUsers } from './useUsers';

const mockUsers = [
  {
    name: { first: 'Alex', last: 'Johnson' },
    email: 'alex@example.com',
    login: { uuid: 'abc123' },
  },
];

describe('useUsers', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ results: mockUsers }),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('fetches and returns users successfully', async () => {
    const { result } = renderHook(() => useUsers());

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      await Promise.resolve(); // flush microtasks (simulate fetch resolution)
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.users).toEqual(mockUsers);
    expect(result.current.isError).toBeNull();
  });

  it('sets error if fetch fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Fetch failed'));

    const { result } = renderHook(() => useUsers());

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.users).toEqual([]);
    expect(result.current.isError).toBe('Failed to load users');
  });
});
