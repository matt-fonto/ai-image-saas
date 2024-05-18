import { z } from "zod";

export const LoginSchema = z
  .object({
    username: z.string().optional(),
    email: z.string().email().optional(),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have than 8 characters"),
  })
  .refine((data) => data.username || data.email, {
    message: "Username or Email is required",
    path: ["login"],
  });

export type LoginType = z.infer<typeof LoginSchema>;
