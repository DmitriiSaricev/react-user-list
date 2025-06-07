import React from "react";
import { Dialog } from "@headlessui/react";
import { UserModalProps } from "./UserModal.types";

const UserModal: React.FC<UserModalProps> = ({ user, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
      )}

      {/* Dialog content */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-2xl z-50">
          <Dialog.Title className="text-xl font-bold text-center text-gray-900 dark:text-white mb-6">
            {user.name.first} {user.name.last}
          </Dialog.Title>

          <div className="flex flex-col items-center text-center space-y-2">
            <img
              src={user.picture.large}
              alt={`${user.name.first} ${user.name.last}`}
              className="w-24 h-24 rounded-full object-cover mb-2"
            />
            <p className="text-gray-700 dark:text-gray-300">{user.email}</p>
            <p className="text-gray-600 dark:text-gray-400">{user.phone}</p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              {user.location.city}, {user.location.country}
            </p>
          </div>

          <button
            onClick={onClose}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900 text-white font-semibold py-2 rounded-lg transition"
          >
            Close
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default UserModal;
