'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useId } from 'react';
import { toast } from 'sonner';

import { Checkbox, Label, Spinner } from '@/components/ui';

import { authClient } from '../auth';
import { QUERY_KEY_ADMIN_USERS } from '.';

interface AdminCheckboxProps {
  userId: string;
  isAdmin: boolean;
}

const AdminCheckbox: React.FC<AdminCheckboxProps> = ({ userId, isAdmin }) => {
  const id = useId();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (checked: boolean) => {
      await authClient.admin.setRole({
        userId,
        role: checked ? 'admin' : 'user',
      });
    },
    onError: (error) => {
      console.error('Failed to update admin role:', error);
      toast.error(`Failed to update admin role. ${error}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ADMIN_USERS] });
    },
  });

  const onCheckedChange = (checked: boolean) => {
    mutation.mutate(checked);
  };

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        checked={isAdmin}
        onCheckedChange={onCheckedChange}
        disabled={mutation.isPending}
        id={id}
      />
      <Label htmlFor={id}>Admin</Label>
      {mutation.isPending && <Spinner />}
    </div>
  );
};

export default AdminCheckbox;
