'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

const useNavigate = ({
  name,
  categoryName,
}: {
  name: string;
  categoryName: string;
}) => {
  const router = useRouter();
  const navigate = useCallback(
    (category: string) => {
      router.push(`/${name}?${categoryName}=${category}`);
    },
    [router, name, categoryName],
  );
  return navigate;
};

export default useNavigate;
