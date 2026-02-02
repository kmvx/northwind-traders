'use client';

import { useCallback, useState } from 'react';
import invariant from 'tiny-invariant';

interface DialogStateType<T> {
  open: boolean;
  resolve?: ((result: T | null) => void) | undefined;
  data: T | null;
}

function useDialog<T>() {
  const [dialogState, setDialogState] = useState<DialogStateType<T>>({
    open: false,
    data: null,
  });

  const openDialog = useCallback(
    (data: T): Promise<T | null> =>
      new Promise((resolve) => {
        setDialogState({ open: true, resolve, data });
      }),
    [],
  );

  const closeDialog = useCallback((result: T | null) => {
    setDialogState((prev) => {
      const resolve = prev.resolve;
      invariant(resolve);
      resolve(result);
      return { ...prev, open: false, resolve: undefined, data: null };
    });
  }, []);

  return {
    dialogState,
    openDialog,
    closeDialog,
  };
}

export default useDialog;
