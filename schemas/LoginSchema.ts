import { z } from "zod";

export const LoginSchema = z.object({
  login: z.string().min(1, "Username or Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

export type LoginType = z.infer<typeof LoginSchema>;
