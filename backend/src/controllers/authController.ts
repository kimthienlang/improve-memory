import type { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService';
import { sendTokens, sendAccessToken } from '../utils/token';
import { ApiError } from '../utils/ApiError';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({
      message: 'Registration successful',
      user: {
        id: user._id,
        username: user.username,
        displayName: user.name,
      }
    });
  } catch (error: any) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.login(username, password);

    sendTokens(res, accessToken, refreshToken);

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
      }
    });
  } catch (error: any) {
    next(error);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new ApiError(401, 'No refresh token provided');
    }

    const { user, accessToken } = await authService.refresh(refreshToken);
    // Chỉ gửi lại Access Token mới (Refresh Token đã có sẵn trong cookie trình duyệt)
    sendAccessToken(res, accessToken);

    res.status(200).json({ message: 'Token refreshed' });
  } catch (error: any) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken;
    await authService.logout(refreshToken);

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken', { path: '/api/auth/refresh' });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error: any) {
    next(error);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const user = await authService.getUserInfo(userId);
    res.status(200).json(user);
  } catch (error: any) {
    next(error);
  }
};
