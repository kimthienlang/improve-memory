import { Request, Response, NextFunction } from 'express';
import winston from 'winston';

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'HH:mm:ss' }),
    winston.format.colorize(),
    winston.format.printf(({ timestamp, level, message, method, url, statusCode }) => {
      return `${timestamp} [${level}] ${method || ''} ${url || ''} -> ${statusCode || ''} ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ 
       filename: 'logs/error.log', 
       level: 'error', 
       format: winston.format.combine(winston.format.timestamp(), winston.format.json()) 
    }),
  ],
});

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // 1. Log ngắn gọn
  logger.error({
    message,
    statusCode,
    method: req.method,
    url: req.originalUrl,
  });

  // 2. In stack trace nếu lỗi nghiêm trọng (500)
  if (statusCode === 500 && process.env.NODE_ENV !== 'production') {
    console.error('\x1b[31m%s\x1b[0m', err.stack);
  }

  // 3. Trả về JSON sạch sẽ cho Frontend
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};
