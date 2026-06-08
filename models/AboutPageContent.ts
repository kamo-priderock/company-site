import mongoose, { Document, Model, Schema } from "mongoose";

export interface IAboutPageContent extends Document {
  bannerImage: string;
  bannerTitle: string;
  bannerSubtitle: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const aboutPageContentSchema = new Schema<IAboutPageContent>(
  {
    bannerImage: { type: String, default: "" },
    bannerTitle: { type: String, default: "About Us", trim: true },
    bannerSubtitle: { type: String, default: "Company Profile", trim: true },
    title: { type: String, default: "", trim: true },
    subtitle: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true },
    image: { type: String, default: "" },
    features: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const AboutPageContent: Model<IAboutPageContent> =
  mongoose.models.AboutPageContent ||
  mongoose.model<IAboutPageContent>(
    "AboutPageContent",
    aboutPageContentSchema
  );

export default AboutPageContent;
