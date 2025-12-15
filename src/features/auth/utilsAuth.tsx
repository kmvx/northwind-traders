export const toErrorAuth = (
  error: { message?: string | undefined } | null | undefined,
): Error | undefined => {
  if (!error) return;

  if (error instanceof Error) {
    return error;
  }

  return new Error(error.message);
};
