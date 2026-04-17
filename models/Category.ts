import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ICategory extends Document {
  title: string;
  image: string;
  link: string;
  /** When set, homepage tile links to this property category landing page */
  pageSlug: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
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
    link: {
      type: String,
      required: [true, 'Link is required'],
      trim: true,
    },
    pageSlug: {
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

const Category: Model<ICategory> = 
  mongoose.models.Category || 
  mongoose.model<ICategory>('Category', categorySchema);

export default Category;
