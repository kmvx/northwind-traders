import type { User } from 'better-auth';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  user: User;
  className?: string | undefined;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, className }) => {
  return (
    <Avatar className={cn('rounded-md', className)}>
      <AvatarImage src={user.image ?? ''} alt={user.name} />
      <AvatarFallback className="rounded-md">?</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
