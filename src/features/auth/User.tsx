import { LogInIcon, LogOutIcon } from 'lucide-react';
import Link from 'next/link';

import { Button, Spinner } from '@/components/ui';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ErrorMessage } from '@/ui';

import { authClient } from './auth-client';

const User: React.FC = () => {
  const { data, isPending, error, refetch } = authClient.useSession();
  const user = data?.user;

  const getNoUserContent = () => {
    if (error) return <ErrorMessage error={error} retry={refetch} />;
    if (isPending) return <Spinner className="size-9" />;
    return (
      <Button asChild>
        <Link href="/login">
          <LogInIcon />
          Login
        </Link>
      </Button>
    );
  };

  if (!user) {
    return <div className="flex justify-center">{getNoUserContent()}</div>;
  }

  return (
    <div
      className="flex items-center justify-between gap-2"
      title={JSON.stringify(user, null, 4)}
    >
      <Avatar className="rounded-md">
        <AvatarImage src={user.image ?? ''} alt={user.name} />
        <AvatarFallback className="rounded-md">?</AvatarFallback>
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

export default User;
