'use client';

import { CalendarIcon, LogOutIcon, MailIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button, Separator } from '@/components/ui';
import {
  DateTime,
  ErrorMessage,
  PanelCentred,
  ResponsiveItem,
  Typography,
  WaitSpinner,
} from '@/ui';
import { setDocumentTitle } from '@/utils';

import {
  authClient,
  LoginButton,
  UserAccounts,
  UserAvatar,
  UserSessions,
} from '.';

const User: React.FC = () => {
  // Logout
  const router = useRouter();
  const onLogout = async () => {
    await authClient.signOut();
    router.push('/');
  };

  // Session info
  const { data, isPending, error, refetch } = authClient.useSession();
  const user = data?.user;

  if (error) return <ErrorMessage error={error} retry={refetch} />;
  if (isPending) return <WaitSpinner />;
  if (!user) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoginButton />
      </div>
    );
  }

  setDocumentTitle(user.name);

  return (
    <PanelCentred className="flex flex-col gap-4 xl:min-w-[800px]">
      <div className="u-hue-violet flex flex-col items-center gap-4 rounded-md p-4">
        <UserAvatar user={user} className="size-20" />
        <Typography.Header1>{user.name}</Typography.Header1>
        <div className="text-muted-foreground text-center text-sm">
          User (you)
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2">
        <ResponsiveItem
          name="Email Address"
          description="Your email used for login and notifications"
          icon={<MailIcon />}
          iconClassName="u-hue-yellow"
        >
          {user.email}
        </ResponsiveItem>
        <ResponsiveItem
          name="Member Since"
          description="Date when you created your account"
          icon={<CalendarIcon />}
          iconClassName="u-hue-violet"
        >
          <DateTime date={user.createdAt} />
        </ResponsiveItem>
        <Button
          onClick={onLogout}
          title="End your current user session"
          variant="outline"
        >
          <LogOutIcon />
          Logout
        </Button>
      </div>
      <Separator />
      <UserSessions currentSessionId={data.session.id} />
      <Separator />
      <UserAccounts />
    </PanelCentred>
  );
};

export default User;
