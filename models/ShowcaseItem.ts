import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IShowcaseItem extends Document {
  title: string;
  image: string;
  stats: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const showcaseItemSchema = new Schema<IShowcaseItem>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    stats: {
      type: String,
      default: '',
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const ShowcaseItem: Model<IShowcaseItem> = 
  mongoose.models.ShowcaseItem || 
  mongoose.model<IShowcaseItem>('ShowcaseItem', showcaseItemSchema);

export default ShowcaseItem;
