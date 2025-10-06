import clsx from 'clsx';
import { TriangleAlertIcon } from 'lucide-react';
import React from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const ErrorMessage: React.FC<{
  error: Error;
  retry?: () => void;
  className?: string;
}> = ({ error, retry, className }) => {
  const text = 'Error: ' + error.message;

  return (
    <div className={clsx('m-2 text-red-600', className)}>
      <Alert
        variant="destructive"
        className="flex flex-wrap items-center gap-2 bg-red-50"
      >
        <TriangleAlertIcon />
        <div
          className="flex-grow text-sm whitespace-pre-wrap"
          title={error.message}
        >
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{text}</AlertDescription>
        </div>
        {retry && (
          <Button
            onClick={retry}
            title="Refetch network request"
            size="sm"
            variant="outline"
          >
            Retry
          </Button>
        )}
      </Alert>
    </div>
  );
};

export default ErrorMessage;
