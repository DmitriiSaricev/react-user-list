// src/components/Loader/Loader.test.tsx
import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

test("renders loading spinner", () => {
  render(<Loader />);
  expect(screen.getByRole("status")).toBeInTheDocument();
});
