import mongoose, { Document, Model, Schema } from "mongoose";

export interface IContactAddress {
  title: string;
  lines: string[];
}

export interface IContactPageInfo extends Document {
  image: string;
  addresses: IContactAddress[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const contactAddressSchema = new Schema<IContactAddress>(
  {
    title: {
      type: String,
      required: [true, "Address title is required"],
      trim: true,
    },
    lines: {
      type: [String],
      default: [],
    },
  },
  { _id: true }
);

const contactPageInfoSchema = new Schema<IContactPageInfo>(
  {
    image: { type: String, default: "" },
    addresses: {
      type: [contactAddressSchema],
      default: [],
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const ContactPageInfo: Model<IContactPageInfo> =
  mongoose.models.ContactPageInfo ||
  mongoose.model<IContactPageInfo>("ContactPageInfo", contactPageInfoSchema);

export default ContactPageInfo;
