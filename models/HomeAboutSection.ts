import mongoose, { Document, Model, Schema } from "mongoose";

export interface IHomeAboutSection extends Document {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const homeAboutSectionSchema = new Schema<IHomeAboutSection>(
  {
    title: { type: String, default: "", trim: true },
    subtitle: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true },
    image: { type: String, default: "" },
    features: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const HomeAboutSection: Model<IHomeAboutSection> =
  mongoose.models.HomeAboutSection ||
  mongoose.model<IHomeAboutSection>(
    "HomeAboutSection",
    homeAboutSectionSchema
  );

export default HomeAboutSection;
