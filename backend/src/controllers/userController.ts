import type { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';
import { ApiError } from '../utils/ApiError';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await userService.findAllUsers();
    res.status(200).json(users);
  } catch (error: any) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id || typeof id !== 'string') {
      throw new ApiError(400, 'Valid User ID is required');
    }
    const user = await userService.findUserById(id);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    res.status(200).json(user);
  } catch (error: any) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error: any) {
    // If service throws specific error message, wrap it in ApiError
    if (error.message === 'Username already exists') {
      next(new ApiError(400, error.message));
    } else {
      next(error);
    }
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id || typeof id !== 'string') {
      throw new ApiError(400, 'Valid User ID is required');
    }
    const updatedUser = await userService.updateUser(id, req.body);
    if (!updatedUser) {
      throw new ApiError(404, 'User not found');
    }
    res.status(200).json(updatedUser);
  } catch (error: any) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id || typeof id !== 'string') {
      throw new ApiError(400, 'Valid User ID is required');
    }
    const deletedUser = await userService.deleteUser(id);
    if (!deletedUser) {
      throw new ApiError(404, 'User not found');
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error: any) {
    next(error);
  }
};


