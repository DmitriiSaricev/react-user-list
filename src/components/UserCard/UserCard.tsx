import React from 'react';
import { UserCardProps } from './UserCard.types';

const UserCard = ({ user, onClick }: UserCardProps) => {
  return (
    <div
      onClick={onClick}
      role='button'
      tabIndex={0}
      aria-label={`View details for ${user.name.first} ${user.name.last}`}
      className='flex cursor-pointer items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-transform outline-none hover:scale-[1.02] hover:shadow-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800'
    >
      <img
        src={user.picture.medium}
        alt={`${user.name.first} ${user.name.last}`}
        className='h-16 w-16 rounded-full object-cover'
      />
      <div>
        <p className='text-lg font-semibold text-gray-900 dark:text-white'>
          {user.name.first} {user.name.last}
        </p>
        <p className='text-sm text-gray-600 dark:text-gray-400'>{user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;
