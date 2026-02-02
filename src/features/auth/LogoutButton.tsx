'use client';

import { LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { Button } from '@/components/ui';
import { useConfirmDialog } from '@/hooks';

import { authClient } from '.';

const LogoutButton: React.FC = () => {
  const { confirm, ConfirmDialogComponent } = useConfirmDialog();

  const router = useRouter();
  const onLogout = useCallback(async () => {
    const confirmed = await confirm({
      title: 'Logout?',
      message:
        'Are you sure you want to logout? You will need to log back in to access your data.',
      confirmText: 'Logout',
    });
    if (!confirmed) return;

    await authClient.signOut();
    router.push('/');
  }, [router, confirm]);

  return (
    <>
      <Button
        onClick={onLogout}
        title="End your current user session"
        variant="outline"
      >
        <LogOutIcon />
        Logout
      </Button>
      {ConfirmDialogComponent}
    </>
  );
};

export default LogoutButton;
