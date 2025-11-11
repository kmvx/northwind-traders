'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import invariant from 'tiny-invariant';

export type NavigateType = (
  category: string,
  queries?: Record<string, string>,
) => void;

const useNavigate = ({
  name,
  categoryQueryName,
}: {
  name: string;
  categoryQueryName?: string;
}) => {
  const router = useRouter();
  const navigate: NavigateType = useCallback(
    (category: string, queries?: Record<string, string>) => {
      invariant(category);

      let url = '/' + name;

      const searchParams = new URLSearchParams();

      if (categoryQueryName) {
        searchParams.append(categoryQueryName, category);
      } else url += '/' + category;

      if (queries) {
        for (const [name, value] of Object.entries(queries)) {
          if (value) searchParams.append(name, value);
        }
      }

      const queryString = searchParams.toString();
      if (queryString) url += '?' + queryString;

      router.push(url);
    },
    [router, name, categoryQueryName],
  );
  return navigate;
};

export default useNavigate;
