import mongoose, { Schema, Document } from 'mongoose';

export interface ICard extends Document {
  collectionId: mongoose.Types.ObjectId;
  front: any; // Using any/Mixed to act like JSONB for text, audio, images, etc.
  back: any;
  orderIndex: number;
}

const CardSchema: Schema = new Schema(
  {
    // Adding index here is crucial for fast lookups per the requirements
    collectionId: { type: Schema.Types.ObjectId, ref: 'Collection', required: true, index: true },
    front: { type: Schema.Types.Mixed, required: true },
    back: { type: Schema.Types.Mixed, required: true },
    orderIndex: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICard>('Card', CardSchema);
