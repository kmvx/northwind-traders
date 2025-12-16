export const toErrorAuth = (
  error:
    | {
        message?: string | undefined;
        statusText?: string | undefined;
        status?: number | undefined;
      }
    | null
    | undefined,
): Error | undefined => {
  if (!error) return;

  return new Error(
    [error.message, error.status, error.statusText].filter(Boolean).join(', '),
  );
};
