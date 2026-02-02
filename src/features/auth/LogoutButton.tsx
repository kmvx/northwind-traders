'use client';

import { LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { Button } from '@/components/ui';

import { authClient } from '.';

const LogoutButton: React.FC = () => {
  const router = useRouter();
  const onLogout = useCallback(async () => {
    await authClient.signOut();
    router.push('/');
  }, [router]);

  return (
    <Button
      onClick={onLogout}
      title="End your current user session"
      variant="outline"
    >
      <LogOutIcon />
      Logout
    </Button>
  );
};

export default LogoutButton;
