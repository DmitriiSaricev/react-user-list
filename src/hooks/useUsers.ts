import { useEffect, useState } from "react";
import { User } from "@/types/user";

// Hook to fetch users from Random User API
export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://randomuser.me/api/?results=50");
        const data = await res.json();
        setUsers(data.results);
      } catch (err) {
        console.error("useUsers error", err);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, isLoading, isError };
}
