import React, { useMemo, useState } from 'react';
import { useUsers } from './hooks/useUsers/useUsers';
import { useDebounce } from './hooks/useDebounce/useDebounce';
import UserCard from './components/UserCard/UserCard';
import Pagination from './components/Pagination/Pagination';
import Loader from './components/Loader/Loader';
import Error from './components/Error/Error';
import UserModal from './components/UserModal/UserModal';
import Filters from './components/Filters/Filters';
import { User } from './types/user';
import Layout from './components/Layout/Layout';

// Number of users per page
const USERS_PER_PAGE = 10;

const App: React.FC = () => {
  // Search input state
  const [searchTerm, setSearchTerm] = useState('');
  // Debounced search value to reduce unnecessary filtering
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Pagination and sorting
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('name-asc');

  // Fetch users using custom hook
  const { users, isLoading, isError } = useUsers();

  // State for selected user and modal visibility
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open user modal
  const openUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Close user modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Filter users by full name or email
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
      return (
        fullName.includes(debouncedSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    });
  }, [users, debouncedSearch]);

  // Sort users based on selected sort option
  const sortedUsers = useMemo(() => {
    const copy = [...filteredUsers];
    switch (sortOption) {
      case 'name-asc':
        return copy.sort((a, b) =>
          `${a.name.first} ${a.name.last}`.localeCompare(`${b.name.first} ${b.name.last}`)
        );
      case 'name-desc':
        return copy.sort((a, b) =>
          `${b.name.first} ${b.name.last}`.localeCompare(`${a.name.first} ${a.name.last}`)
        );
      case 'email-asc':
        return copy.sort((a, b) => a.email.localeCompare(b.email));
      case 'email-desc':
        return copy.sort((a, b) => b.email.localeCompare(a.email));
      default:
        return copy;
    }
  }, [filteredUsers, sortOption]);

  // Total pages based on number of users
  const totalPages = Math.ceil(sortedUsers.length / USERS_PER_PAGE);

  // Paginate users
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * USERS_PER_PAGE;
    return sortedUsers.slice(start, start + USERS_PER_PAGE);
  }, [sortedUsers, currentPage]);

  return (
    <Layout>
      {/* Filters block (search + sort) */}
      <Filters
        search={searchTerm}
        onSearchChange={(value) => {
          setSearchTerm(value);
          setCurrentPage(1); // reset to page 1 on search
        }}
        sort={sortOption}
        onSortChange={(value) => setSortOption(value)}
      />

      {/* Show loader or error message if needed */}
      {isLoading && <Loader />}
      {isError && <Error />}

      {/* Main user list */}
      {!isLoading && !isError && (
        <>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            {paginatedUsers.map((user) => (
              <UserCard key={user.login.uuid} user={user} onClick={() => openUser(user)} />
            ))}
          </div>

          {/* Pagination controls */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

          {/* Modal with user details */}
          {selectedUser && (
            <UserModal user={selectedUser} isOpen={isModalOpen} onClose={closeModal} />
          )}
        </>
      )}
    </Layout>
  );
};

export default App;
