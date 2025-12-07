import { LogOutIcon } from 'lucide-react';
import Link from 'next/link';

import { Button, Spinner } from '@/components/ui';
import { useCloseSidebar } from '@/hooks';
import { ErrorMessage } from '@/ui';

import { LoginButton, UserAvatar } from '.';
import { authClient } from './auth-client';

const UserPreview: React.FC = () => {
  const closeSidebar = useCloseSidebar();

  const { data, isPending, error, refetch } = authClient.useSession();
  const user = data?.user;

  const getNoUserContent = () => {
    if (error) return <ErrorMessage error={error} retry={refetch} />;
    if (isPending) return <Spinner className="size-9" />;
    return <LoginButton />;
  };

  if (!user) {
    return <div className="flex justify-center">{getNoUserContent()}</div>;
  }

  return (
    <div
      className="flex items-center justify-between gap-2 pl-2"
      title={JSON.stringify(user, null, 4)}
    >
      <Button
        onClick={closeSidebar}
        asChild
        variant="ghost"
        className="flex-grow p-0"
      >
        <Link href="/auth/user">
          <UserAvatar user={user} />
          <div className="grid flex-grow">
            <span className="truncate text-sm font-bold">{user.name}</span>
            <span className="text-muted-foreground truncate text-xs">
              {user.email}
            </span>
          </div>
        </Link>
      </Button>
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

export default UserPreview;
