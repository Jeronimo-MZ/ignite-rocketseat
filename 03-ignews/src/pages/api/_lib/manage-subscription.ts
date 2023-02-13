import { fauna } from "@/service/fauna";
import { stripe } from "@/service/stripe";
import { query as q } from "faunadb";
type SaveSubscriptionInput = {
    customerId: string;
    subscriptionId: string;
    created?: boolean;
};

export async function saveSubscription({
    customerId,
    subscriptionId,
    created = false,
}: SaveSubscriptionInput) {
    const userRef = await fauna.query(
        q.Select(
            "ref",
            q.Get(q.Match(q.Index("user_by_stripe_customer_id"), customerId))
        )
    );

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const subscriptionData = {
        id: subscription.id,
        userId: userRef,
        status: subscription.status,
        price_id: subscription.items.data[0].price.id,
    };

    if (created) {
        await fauna.query(
            q.Create(q.Collection("subscriptions"), { data: subscriptionData })
        );
    } else {
        const ref = await fauna.query(
            q.Select(
                "ref",
                q.Get(q.Match(q.Index("subscription_by_id"), subscription.id))
            )
        );
        await fauna.query(q.Replace(ref, { data: subscriptionData }));
    }
}
