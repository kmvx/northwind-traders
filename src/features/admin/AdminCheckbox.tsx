'use client';

import { useId, useState } from 'react';

import { Checkbox, Label, Spinner } from '@/components/ui';
import { useAsync } from '@/hooks';

import { authClient } from '../auth';

interface AdminCheckboxProps {
  userId: string;
  isAdmin: boolean;
}

const AdminCheckbox: React.FC<AdminCheckboxProps> = ({
  userId,
  isAdmin: initialIsAdmin,
}) => {
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);

  const { setPromise, isLoading } = useAsync();
  const onCheckedChange = async (checked: boolean) => {
    setPromise(
      (async () => {
        await authClient.admin.setRole({
          userId,
          role: checked ? 'admin' : 'user',
        });
        setIsAdmin(checked);
      })(),
    );
  };

  const id = useId();

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        checked={isAdmin}
        onCheckedChange={onCheckedChange}
        disabled={isLoading}
        id={id}
      />
      <Label htmlFor={id}>Admin</Label>
      {isLoading && <Spinner />}
    </div>
  );
};

export default AdminCheckbox;
