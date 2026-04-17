import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IProjectsPageContent extends Document {
  title: string;
  description: string;
  heroImage: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const projectsPageContentSchema = new Schema<IProjectsPageContent>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      default: 'Our Projects',
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      default: 'A showcase of our most iconic developments',
    },
    heroImage: {
      type: String,
      required: [true, 'Hero image URL is required'],
      default: 'https://www.atterbury.co.za/wp-content/uploads/2021/03/Mall-of-Africa-outdoor-area.1.jpg',
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

const ProjectsPageContent: Model<IProjectsPageContent> = 
  mongoose.models.ProjectsPageContent || 
  mongoose.model<IProjectsPageContent>('ProjectsPageContent', projectsPageContentSchema);

export default ProjectsPageContent;
