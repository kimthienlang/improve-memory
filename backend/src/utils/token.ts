import jwt from 'jsonwebtoken';
import { Response } from 'express';
import ms from 'ms';

export interface TokenPayload {
  userId: string;
}

export const generateAccessToken = (userId: string): string => {
  return jwt.sign({ userId }, (process.env.JWT_SECRET as string) || 'secret', {
    expiresIn: (process.env.JWT_ACCESS_EXPIRATION as any) || '15m',
  });
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ userId }, (process.env.JWT_REFRESH_SECRET as string) || 'refresh', {
    expiresIn: (process.env.JWT_REFRESH_EXPIRATION as any) || '7d',
  });
};


export const sendTokens = (res: Response, accessToken: string, refreshToken: string): void => {
  const refreshDuration = ms(process.env.JWT_REFRESH_EXPIRATION as any || '7d') as unknown as number;

  // Gửi Access Token
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: refreshDuration,
  });

  // Gửi Refresh Token
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    path: '/api/auth/refresh',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: refreshDuration,
  });
};

export const sendAccessToken = (res: Response, accessToken: string): void => {
  const refreshDuration = ms(process.env.JWT_REFRESH_EXPIRATION as any || '7d') as unknown as number;

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: refreshDuration,
  });
};
