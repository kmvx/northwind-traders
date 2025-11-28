import { useIsFetching } from '@tanstack/react-query';

import { Spinner } from '@/components/ui';

const QueryFetchingIndicator: React.FC = () => {
  const isFetching = useIsFetching();
  if (!isFetching) return null;
  return (
    <div className="flex items-center gap-2" title="Loading network data...">
      <Spinner />
      <span>{isFetching}</span>
    </div>
  );
};

export default QueryFetchingIndicator;
