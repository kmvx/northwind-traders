import type { User } from 'better-auth';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserAvatarProps {
  user: User;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  return (
    <Avatar className="rounded-md">
      <AvatarImage src={user.image ?? ''} alt={user.name} />
      <AvatarFallback className="rounded-md">?</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
