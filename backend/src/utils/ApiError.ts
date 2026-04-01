/**
 * Lớp ApiError để chuẩn hóa các thông báo lỗi liên quan đến HTTP API.
 */
export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    // Ghi lại vết của lỗi (Stack trace) để dễ dàng debug
    Error.captureStackTrace(this, this.constructor);
  }
}
