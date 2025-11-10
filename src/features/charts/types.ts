export interface CategoriesQueryResultType {
  categories: string[] | undefined;
  error: Error | null;
  isLoading: boolean;
  refetch: () => void;
}
