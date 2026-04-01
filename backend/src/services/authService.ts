import User, { type IUser } from '../models/User';
import Session from '../models/Session';
import bcrypt from 'bcrypt';
import { ApiError } from '../utils/ApiError';
import { generateAccessToken, generateRefreshToken } from '../utils/token';
import jwt from 'jsonwebtoken';
import ms from 'ms';

export const register = async (userData: Partial<IUser>): Promise<IUser> => {
  const { username, password, name } = userData;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new ApiError(400, 'Username already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password as string, salt);

  const newUser = new User({ ...userData, password: hashedPassword });
  return await newUser.save();
};

export const login = async (username: string, password: string): Promise<{ user: IUser; accessToken: string; refreshToken: string }> => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new ApiError(401, 'Invalid username or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid username or password');
  }

  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  const refreshDuration = ms((process.env.JWT_REFRESH_EXPIRATION || '7d') as ms.StringValue);
  await Session.create({
    userId: user._id,
    refreshToken,
    expireAt: new Date(Date.now() + refreshDuration),
  });

  return { user, accessToken, refreshToken };
};

export const refresh = async (token: string): Promise<{ user: IUser; accessToken: string }> => {
  console.log('Call refresh');
  // 1. Kiểm tra xem refreshToken có tồn tại trong DB không (nhanh và không cần verify JWT)
  const session = await Session.findOne({ refreshToken: token });
  if (!session) {
    throw new ApiError(401, 'Phiên làm việc không hợp lệ hoặc đã hết hạn');
  }

  // 2. Kiểm tra tính hợp lệ của JWT (chữ ký + thời gian hết hạn)
  let payload: { userId: string };
  try {
    payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'refresh') as { userId: string };
  } catch {
    // JWT không hợp lệ hoặc hết hạn → xóa session khỏi DB để dọn dẹp
    await Session.deleteOne({ _id: session._id });
    throw new ApiError(401, 'Refresh token không hợp lệ hoặc đã hết hạn');
  }

  // 3. Tìm User để đảm bảo tài khoản vẫn tồn tại
  const user = await User.findById(payload.userId);
  if (!user) {
    await Session.deleteOne({ _id: session._id });
    throw new ApiError(401, 'Người dùng không tồn tại');
  }

  // 4. Tạo Access Token mới (Refresh Token vẫn giữ nguyên trong Cookie trình duyệt)
  const accessToken = generateAccessToken(user._id.toString());

  return { user, accessToken };
};

export const logout = async (token: string): Promise<void> => {
  if (token) {
    await Session.deleteOne({ refreshToken: token });
  }
};

export const getUserInfo = async (userId: string): Promise<IUser | null> => {
  return await User.findById(userId).select('-password');
};
