import Head from "next/head";
import styles from "./home.module.scss";
import Image from "next/image";
import girlImage from "@/assets/images/avatar.svg";
import { SubscribeButton } from "@/components/subscribe-button";
import { GetServerSideProps } from "next";
import { stripe } from "@/service/stripe";

type HomeProps = {
    product: {
        priceId: string;
        amount: number;
    };
};

export default function Home({ product }: HomeProps) {
    return (
        <>
            <Head>
                <title>Home | ig.news</title>
            </Head>
            <main className={styles.contentContainer}>
                <section className={styles.hero}>
                    <span>👏 Hey, Welcome</span>
                    <h1>
                        News about the <span>React</span> World
                    </h1>
                    <p>
                        Get access to all the publications <br />
                        for <span>${product.amount}</span>
                    </p>
                    <SubscribeButton />
                </section>
                <Image src={girlImage} alt="Girl coding" />
            </main>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const price = await stripe.prices.retrieve(
        "price_1Mb4n1L9GVvoD1e3yxVrE6YB",
        {
            expand: ["product"],
        }
    );
    const product = {
        priceId: price.id,
        amount: price.unit_amount! / 100,
    };
    return {
        props: {
            product,
        },
    };
};
