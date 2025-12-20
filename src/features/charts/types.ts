export interface CategoriesQueryResultType {
  categories: (string | null)[] | undefined;
  error: Error | null;
  isLoading: boolean;
  refetch: () => void;
}
