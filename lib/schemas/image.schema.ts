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
  userId: z.number().optional(),
  user: z
    .object({
      id: z.number(),
      email: z.string(),
      username: z.string(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      planId: z.number().optional(),
      creditBalance: z.number().optional(),
    })
    .optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type ImageType = z.infer<typeof ImageSchema>;
