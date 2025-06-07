// src/components/Error/Error.test.tsx
import { render, screen } from "@testing-library/react";
import Error from "./Error";

test("renders error message", () => {
  render(<Error />);
  expect(screen.getByRole("alert")).toHaveTextContent(/something went wrong/i);
});
