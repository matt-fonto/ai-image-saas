import { createTransaction } from "@/actions/transaction.action";
import { NextResponse } from "next/server";
import stripe from "stripe";

const { STRIPE_WEBHOOK_SECRET } = process.env;

export async function POST(request: Request) {
  const body = await request.text();

  const signature = String(request.headers.get("stripe-signature"));
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }

  const eventType = event.type;

  if (eventType === "checkout.session.completed") {
    const { id, amount_total, metadata } = event.data.object;

    const transaction = {
      stripeId: id,
      amount: amount_total ? amount_total / 100 : 0,
      plan: metadata?.plan ?? "",
      credits: Number(metadata?.credits),
      buyerId: Number(metadata?.buyerId) ?? 0,
      createdAt: new Date(),
    };

    const newTransaction = await createTransaction(transaction);
    return NextResponse.json({ message: "OK", transaction: newTransaction });
  }

  return NextResponse.json({ message: "OK" });
}
