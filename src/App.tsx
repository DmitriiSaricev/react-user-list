import React, { useMemo, useState } from 'react';
import { useUsers } from './hooks/useUsers';
import { useDebounce } from './hooks/useDebounce';
import UserCard from './components/UserCard/UserCard';
import Pagination from './components/Pagination/Pagination';
import Loader from './components/Loader/Loader';
import Error from './components/Error/Error';
import UserModal from './components/UserModal/UserModal';
import Filters from './components/Filters/Filters';
import { User } from './types/user';
import Layout from './components/Layout/Layout';

const USERS_PER_PAGE = 10;

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('name-asc');

  const { users, isLoading, isError } = useUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
      return (
        fullName.includes(debouncedSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    });
  }, [users, debouncedSearch]);

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

  const totalPages = Math.ceil(sortedUsers.length / USERS_PER_PAGE);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * USERS_PER_PAGE;
    return sortedUsers.slice(start, start + USERS_PER_PAGE);
  }, [sortedUsers, currentPage]);

  return (
    <Layout>
      <Filters
        search={searchTerm}
        onSearchChange={(value) => {
          setSearchTerm(value);
          setCurrentPage(1);
        }}
        sort={sortOption}
        onSortChange={(value) => setSortOption(value)}
      />

      {isLoading && <Loader />}
      {isError && <Error />}

      {!isLoading && !isError && (
        <>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            {paginatedUsers.map((user) => (
              <UserCard key={user.login.uuid} user={user} onClick={() => openUser(user)} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

          {selectedUser && (
            <UserModal user={selectedUser} isOpen={isModalOpen} onClose={closeModal} />
          )}
        </>
      )}
    </Layout>
  );
};

export default App;
