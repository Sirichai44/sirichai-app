export interface IErrorRoute {
  data: string;
  error: Error;
  internal: boolean;
  status: number;
  statusText: string;
}

export interface IApiReturn<T> {
  status: number;
  message: string;
  results: T;
}
