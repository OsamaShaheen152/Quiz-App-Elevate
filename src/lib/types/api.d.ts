declare interface ErrorResponse {
  message: string;
  code: string;
}

declare type SuccessResponse<T> = {
  message: string;
} & T;

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

// Pagination metadata interface
export interface PaginationMetadata {
  currentPage: number;
  numberOfPages: number;
  totalItems?: number;
  itemsPerPage?: number;
}

// Generic paginated response interface
export interface PaginatedResponse<T> {
  exams: T[];
  metadata: PaginationMetadata;
}
