import { api } from "@/service/axios";
import { getStripeJs } from "@/service/stripe-js";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";
export function SubscribeButton() {
    const { status, data: sessionData } = useSession();
    const router = useRouter();
    const handleSubscribe = async () => {
        if (status !== "authenticated") return signIn();
        if (!!(sessionData as any).activeSubscription) {
            router.push("/posts");
            return;
        }
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
