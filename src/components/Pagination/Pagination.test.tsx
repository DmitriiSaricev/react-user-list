// src/components/Pagination/Pagination.test.tsx
import { fireEvent, render, screen } from "@testing-library/react";
import Pagination from "./Pagination";
import React from "react";

test("calls onPageChange when page is clicked", () => {
  const onPageChange = jest.fn();
  render(
    <Pagination currentPage={1} totalPages={3} onPageChange={onPageChange} />,
  );
  fireEvent.click(screen.getByText("2"));
  expect(onPageChange).toHaveBeenCalledWith(2);
});
