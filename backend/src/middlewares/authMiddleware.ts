import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError';

export const authProtect = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return next(new ApiError(401, 'Vui lòng đăng nhập để tiếp tục'));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    (req as any).user = payload;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      // Trả về 410 để Frontend biết cần gọi Refresh Token
      return next(new ApiError(410, 'Access token đã hết hạn'));
    }
    next(new ApiError(401, 'Phiên làm việc không hợp lệ'));
  }
};