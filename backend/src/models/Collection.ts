import mongoose, { Schema, Document } from 'mongoose';

export interface ICollection extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

const CollectionSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICollection>('Collection', CollectionSchema);
