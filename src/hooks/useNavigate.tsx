'use client';

import { useCallback, useMemo } from 'react';
import invariant from 'tiny-invariant';

export type NavigateType = {
  getURL: (category: string, queries?: Record<string, string>) => string;
};

const useNavigate = ({
  name,
  categoryQueryName,
  categoryConverter,
  queries,
}: {
  name: string;
  categoryQueryName?: string;
  categoryConverter?: (category: string) => string;
  queries?: Record<string, string>;
}): NavigateType => {
  const getURL = useCallback(
    (category: string, queriesArg?: Record<string, string>) => {
      const categoryValue = categoryConverter
        ? categoryConverter(category)
        : category;
      invariant(categoryValue);

      let url = '/' + name;

      const searchParams = new URLSearchParams();

      if (categoryQueryName) {
        searchParams.append(categoryQueryName, categoryValue);
      } else url += '/' + categoryValue;

      const addQueries = (queriesLocal?: Record<string, string>) => {
        if (!queriesLocal) return;
        for (const [name, value] of Object.entries(queriesLocal)) {
          if (value) searchParams.append(name, value);
        }
      };

      addQueries(queries);
      addQueries(queriesArg);

      const queryString = searchParams.toString();
      if (queryString) url += '?' + queryString;

      return url;
    },
    [name, categoryQueryName, categoryConverter, queries],
  );

  const navigate = useMemo(() => ({ getURL }), [getURL]);

  return navigate;
};

export default useNavigate;
