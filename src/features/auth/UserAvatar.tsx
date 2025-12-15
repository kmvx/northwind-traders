import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  image: string | null | undefined;
  className?: string | undefined;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ image, className }) => {
  return (
    <Avatar className={cn('rounded-md', className)}>
      <AvatarImage src={image ?? ''} alt="" />
      <AvatarFallback className="rounded-md">?</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
