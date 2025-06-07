import { render, screen } from "@testing-library/react";
import UserCard from "./UserCard";
import type { User } from "@/types/user";
import * as React from "react";

const mockUser: User = {
  gender: "male",
  name: { title: "Mr", first: "John", last: "Doe" },
  location: {
    street: { number: 1, name: "Main St" },
    city: "City",
    state: "State",
    country: "Country",
    postcode: "12345",
    coordinates: { latitude: "0", longitude: "0" },
    timezone: { offset: "+0:00", description: "UTC" },
  },
  email: "john.doe@example.com",
  login: {
    uuid: "123",
    username: "johndoe",
    password: "",
    salt: "",
    md5: "",
    sha1: "",
    sha256: "",
  },
  dob: { date: "1990-01-01", age: 30 },
  registered: { date: "2010-01-01", age: 10 },
  phone: "123-456",
  cell: "789-000",
  id: { name: "SSN", value: "000-00-0000" },
  picture: {
    large: "https://via.placeholder.com/150",
    medium: "https://via.placeholder.com/100",
    thumbnail: "https://via.placeholder.com/50",
  },
  nat: "US",
};

test("renders user card with name and email", () => {
  render(<UserCard user={mockUser} />);
  expect(screen.getByText(/john doe/i)).toBeInTheDocument();
  expect(screen.getByText(/john.doe@example.com/i)).toBeInTheDocument();
});
