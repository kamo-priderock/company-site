import mongoose, { Document, Model, Schema } from "mongoose";

export interface IFooterLink {
  label: string;
  href: string;
  order: number;
}

export interface IFooterContent extends Document {
  brandName: string;
  logoUrl: string;
  tagline: string;
  facebookUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  quickLinksHeading: string;
  quickLinks: IFooterLink[];
  servicesHeading: string;
  serviceLinks: IFooterLink[];
  copyrightText: string;
  legalLinks: IFooterLink[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const footerLinkSchema = new Schema<IFooterLink>(
  {
    label: { type: String, default: "", trim: true },
    href: { type: String, default: "/", trim: true },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const footerContentSchema = new Schema<IFooterContent>(
  {
    brandName: { type: String, default: "Pride Rock Property Group", trim: true },
    logoUrl: { type: String, default: "/PrideRock.png" },
    tagline: {
      type: String,
      default:
        "Pioneering the future of property development with innovative, sustainable, and premium spaces.",
      trim: true,
    },
    facebookUrl: { type: String, default: "" },
    twitterUrl: { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },
    instagramUrl: { type: String, default: "" },
    quickLinksHeading: { type: String, default: "Quick Links", trim: true },
    quickLinks: { type: [footerLinkSchema], default: [] },
    servicesHeading: { type: String, default: "Services", trim: true },
    serviceLinks: { type: [footerLinkSchema], default: [] },
    copyrightText: {
      type: String,
      default: "© {year} Pride Rock Property Group. All rights reserved.",
      trim: true,
    },
    legalLinks: { type: [footerLinkSchema], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const FooterContent: Model<IFooterContent> =
  mongoose.models.FooterContent ||
  mongoose.model<IFooterContent>("FooterContent", footerContentSchema);

export default FooterContent;
