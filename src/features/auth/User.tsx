import { LogInIcon, LogOutIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { authClient } from './auth-client';

const User: React.FC = () => {
  const { data } = authClient.useSession();
  const user = data?.user;

  const getContent = () => {
    if (!user)
      return (
        <Button asChild>
          <Link href="/login">
            <LogInIcon />
            Login
          </Link>
        </Button>
      );

    return (
      <div
        className="flex items-center justify-between gap-2"
        title={JSON.stringify(user, null, 4)}
      >
        <Avatar className="rounded-md">
          <AvatarImage src={user.image ?? ''} alt={user.name} />
          <AvatarFallback className="rounded-lg">??</AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-start text-sm leading-tight">
          <span className="truncate font-semibold">{user.name}</span>
          <span className="truncate text-xs text-muted-foreground">
            {user.email}
          </span>
        </div>
        <Button
          onClick={async () => await authClient.signOut()}
          title="Logout"
          variant="outline"
          size="icon"
        >
          <LogOutIcon />
        </Button>
      </div>
    );
  };

  return <div>{getContent()}</div>;
};

export default User;
