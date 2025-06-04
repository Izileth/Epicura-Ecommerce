export interface ApiResponse<T> {
    data: T;
    message?: string;
}

export interface ApiError {
    message: string;
    statusCode: number;
    errors?: Record<string, string[]>;
}

// Para paginação
export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
}