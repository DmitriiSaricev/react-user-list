// src/components/Error/Error.test.tsx
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import Error from './Error';
import React from 'react';

test("renders error message", () => {
  render(<Error />);
  expect(screen.getByRole("alert")).toHaveTextContent(/something went wrong/i);
});