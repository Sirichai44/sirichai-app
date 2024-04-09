export interface IStore {
  test: string;
  word: string;
}

export interface IErrorRoute {
  data: string;
  error: Error;
  internal: boolean;
  status: number;
  statusText: string;
}
