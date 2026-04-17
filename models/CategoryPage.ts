import mongoose, { Document, Model, Schema } from "mongoose";
import { CATEGORY_PAGE_SLUGS, type CategoryPageSlug } from "@/lib/categoryPageSlugs";

const statSchema = new Schema(
  { value: { type: String, default: "" }, label: { type: String, default: "" } },
  { _id: false }
);

const cardSchema = new Schema(
  {
    icon: { type: String, default: "Building2" },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    subtitle: { type: String, default: "" },
  },
  { _id: false }
);

const specCategorySchema = new Schema(
  {
    category: { type: String, default: "" },
    items: { type: [String], default: [] },
  },
  { _id: false }
);

const amenityGroupSchema = new Schema(
  {
    title: { type: String, default: "" },
    icon: { type: String, default: "Home" },
    items: { type: [String], default: [] },
  },
  { _id: false }
);

const mixedComponentSchema = new Schema(
  {
    type: { type: String, default: "" },
    description: { type: String, default: "" },
    features: { type: [String], default: [] },
  },
  { _id: false }
);

export interface ICategoryPage extends Document {
  slug: CategoryPageSlug;
  projectFilterType: string;
  heroImage: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCta1Label: string;
  heroCta1Href: string;
  heroCta2Label: string;
  heroCta2Href: string;
  heroAlign: "left" | "center";
  stats: { value: string; label: string }[];
  highlightEyebrow: string;
  highlightTitle: string;
  highlightSubtitle: string;
  cards: { icon: string; title: string; description: string; subtitle: string }[];
  featuresEyebrow: string;
  featuresTitle: string;
  featuresIntro: string;
  featureBullets: string[];
  featuresSideImage: string;
  featuresBadgeTitle: string;
  featuresBadgeSubtitle: string;
  specCategories: { category: string; items: string[] }[];
  amenityGroups: { title: string; icon: string; items: string[] }[];
  mixedUseComponents: { type: string; description: string; features: string[] }[];
  projectsEyebrow: string;
  projectsTitle: string;
  projectsIntro: string;
  projectsButtonText: string;
  projectsButtonLink: string;
  footerTitle: string;
  footerSubtitle: string;
  footerPrimaryText: string;
  footerPrimaryHref: string;
  footerSecondaryText: string;
  footerSecondaryHref: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const categoryPageSchema = new Schema<ICategoryPage>(
  {
    slug: {
      type: String,
      required: true,
      enum: CATEGORY_PAGE_SLUGS,
      unique: true,
    },
    projectFilterType: {
      type: String,
      default: "Commercial",
    },
    heroImage: { type: String, default: "" },
    heroEyebrow: { type: String, default: "" },
    heroTitle: { type: String, default: "" },
    heroSubtitle: { type: String, default: "" },
    heroCta1Label: { type: String, default: "" },
    heroCta1Href: { type: String, default: "/contact" },
    heroCta2Label: { type: String, default: "" },
    heroCta2Href: { type: String, default: "#projects" },
    heroAlign: { type: String, enum: ["left", "center"], default: "left" },
    stats: { type: [statSchema], default: [] },
    highlightEyebrow: { type: String, default: "" },
    highlightTitle: { type: String, default: "" },
    highlightSubtitle: { type: String, default: "" },
    cards: { type: [cardSchema], default: [] },
    featuresEyebrow: { type: String, default: "" },
    featuresTitle: { type: String, default: "" },
    featuresIntro: { type: String, default: "" },
    featureBullets: { type: [String], default: [] },
    featuresSideImage: { type: String, default: "" },
    featuresBadgeTitle: { type: String, default: "" },
    featuresBadgeSubtitle: { type: String, default: "" },
    specCategories: { type: [specCategorySchema], default: [] },
    amenityGroups: { type: [amenityGroupSchema], default: [] },
    mixedUseComponents: { type: [mixedComponentSchema], default: [] },
    projectsEyebrow: { type: String, default: "" },
    projectsTitle: { type: String, default: "" },
    projectsIntro: { type: String, default: "" },
    projectsButtonText: { type: String, default: "" },
    projectsButtonLink: { type: String, default: "/projects" },
    footerTitle: { type: String, default: "" },
    footerSubtitle: { type: String, default: "" },
    footerPrimaryText: { type: String, default: "" },
    footerPrimaryHref: { type: String, default: "/contact" },
    footerSecondaryText: { type: String, default: "" },
    footerSecondaryHref: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const CategoryPage: Model<ICategoryPage> =
  mongoose.models.CategoryPage ||
  mongoose.model<ICategoryPage>("CategoryPage", categoryPageSchema);

export default CategoryPage;
