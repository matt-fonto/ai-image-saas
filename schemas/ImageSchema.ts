import { z } from "zod";

const ImageSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  transformationType: z.string(),
  publicId: z.string(),
  secureUrl: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
  config: z.any().optional(),
  transformationUrl: z.string().optional(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  authorId: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type ImageType = z.infer<typeof ImageSchema>;
