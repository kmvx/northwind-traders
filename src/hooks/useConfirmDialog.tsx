'use client';

import React from 'react';

import { BasicDialog } from '@/ui';

import { useDialog } from '.';

interface DialogOptions {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
}

const DEFAULT_OPTIONS: DialogOptions = {
  title: 'Are you sure?',
  message: 'This action cannot be undone.',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
};

export default function useConfirmDialog() {
  const { dialogState, openDialog, closeDialog } = useDialog<DialogOptions>();

  const confirm = React.useCallback(
    async (options: Partial<DialogOptions> = {}): Promise<boolean> => {
      return Boolean(await openDialog({ ...DEFAULT_OPTIONS, ...options }));
    },
    [openDialog],
  );

  const ConfirmDialogComponent = React.useMemo(() => {
    if (!dialogState.open) return null;
    const data = dialogState.data;
    if (!data) return null;

    return (
      <BasicDialog
        open
        onCancel={() => closeDialog(null)}
        onConfirm={() => closeDialog(data)}
        title={data.title}
        description={data.message}
        confirmText={data.confirmText}
        cancelText={data.cancelText}
        confirmVariant="destructive"
      />
    );
  }, [dialogState, closeDialog]);

  return { confirm, ConfirmDialogComponent };
}
