import { z } from "zod";

export const UserSchema = z.object({
  id: z.number().optional(),
  email: z.string(),
  username: z.string(),
  password: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  images: z.array(z.number()).optional(),
  photo: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  planId: z.number().optional().default(1),
  creditBalance: z.number().optional().default(10),
  transactions: z.array(z.number()).optional(),
});

export type UserType = z.infer<typeof UserSchema>;
