'use client';

import React from 'react';

import { Button } from '@/components/ui';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface BasicDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  description?: string | undefined;
  cancelText?: string | undefined;
  confirmText?: string | undefined;
  confirmDisabled?: boolean | undefined;
  confirmVariant?: 'default' | 'destructive' | undefined;
  children?: React.ReactNode;
  footerComponent?: React.ReactNode;
}

export default function BasicDialog({
  open,
  onCancel,
  onConfirm,
  title,
  description,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  confirmDisabled,
  confirmVariant = 'default',
  children,
  footerComponent,
}: BasicDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(val) => !val && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {children}

        <DialogFooter>
          <div className="flex grow flex-wrap gap-2">{footerComponent}</div>
          <Button variant="outline" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button
            variant={confirmVariant}
            onClick={onConfirm}
            disabled={confirmDisabled}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
