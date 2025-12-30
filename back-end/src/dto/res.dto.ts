export type ErrorObj = {
  code: number | string;
  name: string;
  message: string;
  timestamp: string;
  path: string;
};

export type ErrorResponseDTO = {
  status: 'error';
  statusCode: number;
  error: ErrorObj;
};

export type SuccessResponseDTO<T> = {
  status: 'success';
  statusCode: number;
  data: T;
};
