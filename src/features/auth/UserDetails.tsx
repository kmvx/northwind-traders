'use client';

import type { UserWithRole } from 'better-auth/client/plugins';
import {
  CalendarIcon,
  LogOutIcon,
  MailIcon,
  ShieldUserIcon,
  UserIcon,
} from 'lucide-react';

import { Button, Separator } from '@/components/ui';
import type { Nullable } from '@/types';
import {
  BasicLink,
  DateTime,
  PanelCentred,
  ResponsiveItem,
  Typography,
} from '@/ui';
import { setDocumentTitle } from '@/utils';

import { isAdmin } from '../admin';
import { UserAccounts, UserAvatar, UserSessions } from '.';

type UserWithRoleFixed = Pick<
  Nullable<UserWithRole, 'role' | 'banned'>,
  'id' | 'name' | 'email' | 'image' | 'createdAt' | 'role'
>;

interface UserDetailsProps {
  user: UserWithRoleFixed;
  currentSessionId: string;
  onLogout?: (() => void) | undefined;
}

const UserDetails: React.FC<UserDetailsProps> = ({
  user,
  onLogout,
  currentSessionId,
}) => {
  setDocumentTitle(user.name);

  return (
    <PanelCentred className="flex flex-col gap-4 xl:min-w-[800px]">
      <div className="u-hue-violet flex flex-col items-center gap-4 rounded-md p-4">
        <UserAvatar image={user.image} className="size-20" />
        <Typography.Header1>{user.name}</Typography.Header1>
      </div>
      <div className="grid grid-cols-1 items-center gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
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
        <ResponsiveItem
          name="Roles"
          description="The assigned user roles in the system"
          icon={<UserIcon />}
          iconClassName="u-hue-green"
        >
          {user.role}
        </ResponsiveItem>
        {onLogout && (
          <div className="flex gap-2">
            <Button
              onClick={onLogout}
              title="End your current user session"
              variant="outline"
            >
              <LogOutIcon />
              Logout
            </Button>
            {isAdmin(user) && (
              <BasicLink
                href="/auth/admin"
                variant="outline"
                size="icon"
                title="Admin"
              >
                <ShieldUserIcon />
              </BasicLink>
            )}
          </div>
        )}
      </div>
      <Separator />
      <UserSessions userId={user.id} currentSessionId={currentSessionId} />
      <Separator />
      <UserAccounts userId={user.id} />
    </PanelCentred>
  );
};

export default UserDetails;
