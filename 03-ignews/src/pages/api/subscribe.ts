import { fauna } from "@/service/fauna";
import { stripe } from "@/service/stripe";
import { query as q } from "faunadb";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

type User = {
    ref: { id: string };
    data: { stripe_customer_id: string };
};

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

    const email = session.user?.email as string;

    const user = await fauna.query<User>(
        q.Get(q.Match(q.Index("user_by_email"), q.Casefold(email)))
    );
    let stripeCustomerId: string;

    if (user.data.stripe_customer_id) {
        stripeCustomerId = user.data.stripe_customer_id;
    } else {
        const stripeCustomer = await stripe.customers.create({ email });
        await fauna.query(
            q.Update(q.Ref(q.Collection("users"), user.ref.id), {
                data: { stripe_customer_id: stripeCustomer.id },
            })
        );
        stripeCustomerId = stripeCustomer.id;
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
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
