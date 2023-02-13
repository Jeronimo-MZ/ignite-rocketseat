import { api } from "@/service/axios";
import { getStripeJs } from "@/service/stripe-js";
import { signIn, useSession } from "next-auth/react";
import styles from "./styles.module.scss";
export function SubscribeButton() {
    const { status } = useSession();
    const handleSubscribe = async () => {
        if (status !== "authenticated") return signIn();

        try {
            const { data } = await api.post("subscribe");
            const { sessionId } = data;

            const stripe = await getStripeJs();
            stripe?.redirectToCheckout({ sessionId });
        } catch (err) {
            alert((err as Error).message);
        }
    };
    return (
        <button
            onClick={handleSubscribe}
            type="button"
            className={styles.container}
        >
            Subscribe now
        </button>
    );
}
