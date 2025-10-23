import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { markUserAsPaid } from "@/lib/clerk";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;

    if (userId) {
      try {
        await markUserAsPaid(userId);
        console.log(`User ${userId} marked as paid via webhook`);
      } catch (error) {
        console.error("Failed to mark user as paid:", error);
        return NextResponse.json(
          { error: "Failed to update user" },
          { status: 500 }
        );
      }
    } else {
      console.error("No userId in session metadata");
    }
  }

  return NextResponse.json({ received: true });
}
