import { getPrismicClient } from "@/service/prismic";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { getSession, useSession } from "next-auth/react";
import * as PrismicH from "@prismicio/helpers";
import Head from "next/head";
import styles from "../post.module.scss";
import parse from "html-react-parser";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
type PostProps = {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    };
};

export default function PostPreview({ post }: PostProps) {
    const session = useSession();
    const router = useRouter();
    useEffect(() => {
        if (
            session.status === "authenticated" &&
            (session.data as any).activeSubscription !== null
        ) {
            router.push(`/posts/${post.slug}`);
        }
    }, [session, post.slug]);
    return (
        <>
            <Head>
                <title>{post.title} | ig.news</title>
            </Head>
            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div
                        className={`${styles.content} ${styles.previewContent}`}
                    >
                        {parse(post.content)}
                    </div>
                    <div className={styles.continueReading}>
                        Wanna continue reading?
                        <Link href="/">Subscribe Now 🤗</Link>
                    </div>
                </article>
            </main>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const prismic = await getPrismicClient();
    const slug = params?.slug as string;

    const response = await prismic.getByUID("post", slug);
    console.log({ response, slug });

    const post = {
        slug,
        title: PrismicH.asText(response.data.title),
        content: PrismicH.asHTML(response.data.content.splice(0, 3)),
        updatedAt: new Date(response.first_publication_date).toLocaleDateString(
            "pt-BR",
            {
                day: "2-digit",
                month: "long",
                year: "numeric",
            }
        ),
    };

    return {
        props: {
            post,
        },
    };
};
