export interface CountriesQueryResultType {
  countries: string[] | undefined;
  error: Error | null;
  isLoading: boolean;
  refetch: () => void;
}
