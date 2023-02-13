import Head from "next/head";
import styles from "@/styles/Home.module.scss";

export default function Home() {
    return (
        <>
            <Head>
                <title>ig.news</title>
            </Head>
            <main className={styles.main}>
                <h1>Hello World</h1>
            </main>
        </>
    );
}
