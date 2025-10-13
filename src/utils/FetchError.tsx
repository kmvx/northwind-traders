class FetchError extends Error {
  public readonly status: number;
  public readonly statusText: string;
  public readonly url: string;

  constructor(response: Response, message?: string) {
    super(
      message ??
        `Fetch failed with status ${response.status}  ${response.statusText}`,
    );
    this.name = 'FetchError';
    this.status = response.status;
    this.statusText = response.statusText;
    this.url = response.url;
  }
}

export default FetchError;
