import { TriangleAlertIcon } from 'lucide-react';
import React from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { ButtonWithTooltip, CopyButton } from '.';

interface ErrorMessageProps {
  error: Error;
  retry?: () => void;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  retry,
  className,
}) => {
  const text = 'Error: ' + error.message;

  return (
    <div className={className}>
      <Alert
        variant="destructive"
        className="flex flex-wrap items-center gap-2 bg-red-500/20 [&>svg]:size-9"
      >
        <TriangleAlertIcon />
        <div
          className="flex-grow text-sm whitespace-pre-wrap"
          title={error.message}
        >
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{text}</AlertDescription>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <CopyButton content={text} />
          {retry && (
            <ButtonWithTooltip
              onClick={retry}
              title="Refetch network request"
              variant="outline"
            >
              Retry
            </ButtonWithTooltip>
          )}
        </div>
      </Alert>
    </div>
  );
};

export default ErrorMessage;
