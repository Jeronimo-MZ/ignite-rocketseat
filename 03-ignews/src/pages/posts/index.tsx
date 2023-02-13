import Head from "next/head";
import styles from "./styles.module.scss";

export default function Posts() {
    return (
        <>
            <Head>
                <title>Post | ig.news</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    {[1, 2, 3, 4, 5].map((item) => (
                        <a key={item} className={styles.post} href="#">
                            <time>12 de Fevereiro de 2023</time>
                            <strong>
                                Creating a Monorepo with Yarn &amp; Yarn
                                Workspace
                            </strong>
                            <p>
                                In this guide, you will learn how to create a
                                Monorepo to manage multiple packages with a
                                shared build, test and release process
                            </p>
                        </a>
                    ))}
                </div>
            </main>
        </>
    );
}
