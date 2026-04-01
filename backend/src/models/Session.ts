import mongoose, { Schema, Document } from 'mongoose';

export interface ISession extends Document {
  userId: mongoose.Types.ObjectId;
  refreshToken: string;
  expireAt: Date;
}

const SessionSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    refreshToken: { type: String, required: true },
    expireAt: { 
      type: Date, 
      required: true, 
      index: { expires: 0 } // MongoDB TTL Index: Tự động xóa khi đến thời điểm này
    },
  },
  {
    timestamps: true,
  }
);

// Tạo index để tìm kiếm token nhanh hơn
SessionSchema.index({ refreshToken: 1 });

export default mongoose.model<ISession>('Session', SessionSchema);
