"use server";

import db from "@/lib/db";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { updateCredits } from "./user.actions";
import { handleError } from "@/lib/utils/handleError";

export async function buyCredits(transaction: CheckoutTransactionParams) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const amount = Number(transaction.amount) * 100; // convert to cents

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: amount,
          product_data: {
            name: transaction.plan,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      plan: transaction.plan,
      credits: transaction.credits,
      buyerId: transaction.buyerId,
    },
    mode: "payment",
    success_url: `${process.env.VERCEL_URL}/profile`, // in success, go to:
    cancel_url: `${process.env.VERCEL_URL}/`, // in error, go to:
  });

  redirect(session.url ?? "");
}

// this will be called by the webhook => after the payment is successful
export async function createTransaction(transaction: CreateTransactionParams) {
  try {
    // create in the database
    const newTransaction = await db.transaction.create({
      data: {
        ...transaction,
        buyerId: transaction.buyerId,
      },
    });

    // update the user's credits
    await updateCredits(transaction.buyerId, transaction.credits);

    return JSON.parse(JSON.stringify(newTransaction));
  } catch (error) {
    handleError(error);
  }
}
