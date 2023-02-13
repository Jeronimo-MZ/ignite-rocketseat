import { stripe } from "@/service/stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function checkout(
    request: NextApiRequest,
    response: NextApiResponse
) {
    if (request.method !== "POST") {
        response.setHeader("Allow", "POST");
        return response.status(405).end("Method not allowed");
    }
    const session = await getSession({ req: request });
    if (!session) {
        return response.status(401).end("Unauthorized");
    }

    const stripeCustomer = await stripe.customers.create({
        email: session.user?.email as string,
    });
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
        customer: stripeCustomer.id,
        payment_method_types: ["card"],
        billing_address_collection: "required",
        line_items: [{ price: "price_1Mb4n1L9GVvoD1e3yxVrE6YB", quantity: 1 }],
        mode: "subscription",
        allow_promotion_codes: true,
        success_url: process.env.STRIPE_SUCCESS_URL as string,
        cancel_url: process.env.STRIPE_CANCEL_URL,
    });
    return response.status(200).json({ sessionId: stripeCheckoutSession.id });
}
