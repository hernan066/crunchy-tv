export interface ApiResponseSuccess<T> {
  ok: boolean;
  status: number;
  data: T;
  foundPages?: number;
  nextPage?: string;
  previousPage?: string;
}
export interface ApiResponseError {
  ok: boolean;
  status: number;
  msg: string;
}
