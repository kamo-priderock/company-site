import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ 
    image: { 
      maxFileSize: "16MB"
    } 
  })
    .middleware(async () => {
      return { userId: "admin" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId, url: file.url };
    }),

  multiImageUploader: f({
    image: {
      maxFileSize: "16MB",
      maxFileCount: 50,
    },
  })
    .middleware(async () => {
      return { userId: "admin" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId, url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
