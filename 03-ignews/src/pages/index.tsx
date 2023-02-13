import Head from "next/head";
import styles from "./home.module.scss";
import Image from "next/image";
import girlImage from "@/assets/images/avatar.svg";
import { SubscribeButton } from "@/components/subscribe-button";

export default function Home() {
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
                        for <span>$9.90</span>
                    </p>
                    <SubscribeButton />
                </section>
                <Image src={girlImage} alt="Girl coding" />
            </main>
        </>
    );
}
