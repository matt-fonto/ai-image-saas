import { z } from "zod";

const TransactionSchema = z.object({
  id: z.number().optional(),
  createdAt: z.date().optional(),
  stripeId: z.string(),
  amount: z.number(),
  plan: z.string().optional(),
  credits: z.number().optional(),
  buyerId: z.number(),
});

export type TransactionType = z.infer<typeof TransactionSchema>;
