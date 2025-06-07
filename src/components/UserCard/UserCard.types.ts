// Props for the UserCard component
import type { User } from "@/types/user";

export interface UserCardProps {
  user: User;
  onClick?: () => void;
}
