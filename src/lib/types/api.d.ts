declare interface ErrorResponse {
  message: string;
  code: string;
}

declare type SuccessResponse<T> = {
  message: string;
} & T;

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
