import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IAboutContent extends Document {
  title: string;
  subtitle: string;
  description: string;
  /** Photo beside the about copy (homepage + /about section) */
  image: string;
  /** Hero banner at the top of /about only */
  bannerImage: string;
  features: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const aboutContentSchema = new Schema<IAboutContent>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    subtitle: {
      type: String,
      required: [true, 'Subtitle is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    image: {
      type: String,
      default: '',
    },
    bannerImage: {
      type: String,
      default: '',
    },
    features: {
      type: [String],
      default: [],
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

const AboutContent: Model<IAboutContent> = 
  mongoose.models.AboutContent || 
  mongoose.model<IAboutContent>('AboutContent', aboutContentSchema);

export default AboutContent;
