import mongoose, { Document, Model, Schema } from "mongoose";

const PROJECT_TYPES = [
  "Commercial",
  "Retail",
  "Industrial",
  "Residential",
  "Mixed-Use",
] as const;

const PROJECT_STATUSES = [
  "Completed",
  "Under Construction",
  "Coming Soon",
  "Planning",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export interface IGallerySection {
  title: string;
  description?: string;
  images: string[];
  order: number;
}

export interface IProject extends Document {
  title: string;
  type: ProjectType;
  location: string;
  status: ProjectStatus;
  /** Card / listing thumbnail */
  image: string;
  description?: string;
  area?: string;
  units?: string;
  completion?: string;
  architect?: string;
  features: string[];
  amenities: string[];
  /** Unlimited hero + main gallery images */
  gallery: string[];
  /** Optional grouped galleries (e.g. “Tenants confirmed”) */
  gallerySections: IGallerySection[];
  contactPhone?: string;
  contactEmail?: string;
  brochureUrl?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const gallerySectionSchema = new Schema<IGallerySection>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    images: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: PROJECT_TYPES,
      required: [true, "Project type is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: PROJECT_STATUSES,
      default: "Planning",
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    description: { type: String, default: "", trim: true },
    area: { type: String, default: "" },
    units: { type: String, default: "" },
    completion: { type: String, default: "" },
    architect: { type: String, default: "" },
    features: { type: [String], default: [] },
    amenities: { type: [String], default: [] },
    gallery: { type: [String], default: [] },
    gallerySections: { type: [gallerySectionSchema], default: [] },
    contactPhone: { type: String, default: "" },
    contactEmail: { type: String, default: "" },
    brochureUrl: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);

export default Project;
