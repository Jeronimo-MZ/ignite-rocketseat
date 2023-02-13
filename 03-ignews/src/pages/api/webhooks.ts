import { stripe } from "@/service/stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import Stripe from "stripe";
import { saveSubscription } from "./_lib/manage-subscription";

async function buffer(readable: Readable) {
    const chunks = [];
    for await (const chunk of readable) {
        chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
}

export const config = {
    api: {
        bodyParser: false,
    },
};

const relevantEvents = new Set([
    "customer.subscription.updated",
    "customer.subscription.deleted",
    "checkout.session.completed",
]);

export default async function webhooks(
    request: NextApiRequest,
    response: NextApiResponse
) {
    if (request.method !== "POST") {
        response.setHeader("Allow", "POST");
        return response.status(405).end("Method not allowed");
    }

    const buf = await buffer(request);
    const secret = request.headers["stripe-signature"];

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(
            buf,
            secret as string,
            process.env.STRIPE_WEBHOOK_SECRET as string
        );
    } catch (error) {
        return response
            .status(400)
            .send(`WEBHOOK_ERROR: ${(error as Error).message}`);
    }

    const { type } = event;
    if (relevantEvents.has(type)) {
        try {
            switch (type) {
                case "customer.subscription.updated":
                case "customer.subscription.deleted":
                    const subscription = event.data
                        .object as Stripe.Subscription;

                    await saveSubscription({
                        customerId: subscription.customer.toString(),
                        subscriptionId: subscription.id.toString(),
                        created: false,
                    });
                    break;
                case "checkout.session.completed":
                    const checkoutSession = event.data
                        .object as Stripe.Checkout.Session;
                    await saveSubscription({
                        customerId:
                            checkoutSession.customer?.toString() as string,
                        subscriptionId:
                            checkoutSession.subscription?.toString() as string,
                        created: true,
                    });
                    break;
                default:
                    throw new Error("Unhandled Event");
            }
        } catch (error) {
            return response.json({ error: "webhook failed" });
        }
    }
    response.json({ received: true });
}
