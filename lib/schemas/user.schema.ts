import { z } from "zod";

// PRISMA SCHEMA
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

export const CreateUserSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have than 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

export type CreateUserType = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = z.object({
  id: z.number(),
  email: z.string().email().optional(),
  username: z.string().min(1).max(100).optional(),
  password: z.string().min(8).optional(),
});

export type UpdateUserType = z.infer<typeof UpdateUserSchema>;
