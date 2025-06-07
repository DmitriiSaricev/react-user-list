import { User } from "@/types/user";

export type UserModalProps = {
  user: User;
  isOpen: boolean;
  onClose: () => void;
};
