import Link from 'next/link';

import { Button, Skeleton } from '@/components/ui';
import { useCloseSidebar } from '@/hooks';
import { ErrorMessage } from '@/ui';

import { LoginButton, UserAvatar } from '.';
import { authClient } from './auth-client';

const UserPreview: React.FC = () => {
  const closeSidebar = useCloseSidebar();

  const { data, isPending, error, refetch } = authClient.useSession();
  const user = data?.user;

  if (!user) {
    if (error) return <ErrorMessage error={error} retry={refetch} />;
    if (isPending) return <LocalSceleton />;
    return (
      <div className="flex justify-center">
        <LoginButton />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={closeSidebar}
        title={JSON.stringify(user, null, 4)}
        asChild
        variant="ghost"
        className="ml-2 p-0"
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
    </div>
  );
};

function LocalSceleton() {
  return (
    <div className="ml-2 flex w-full items-center gap-2">
      <Skeleton className="size-8 rounded-md" />
      <div className="grid flex-grow gap-2">
        <Skeleton className="h-4 w-15" />
        <Skeleton className="h-3 w-40" />
      </div>
    </div>
  );
}

export default UserPreview;
