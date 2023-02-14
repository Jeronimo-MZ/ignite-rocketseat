import { getPrismicClient } from "@/service/prismic";
import * as Prismic from "@prismicio/client";
import * as PrismicH from "@prismicio/helpers";

import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "./styles.module.scss";

type PostsProps = {
    posts: Array<{
        slug: string;
        title: string;
        excerpt: string;
        updatedAt: string;
    }>;
};

export default function Posts({ posts }: PostsProps) {
    return (
        <>
            <Head>
                <title>Post | ig.news</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    {posts.map((item) => (
                        <Link
                            key={item.slug}
                            className={styles.post}
                            href={`/posts/${item.slug}`}
                        >
                            <time>{item.updatedAt}</time>
                            <strong>{item.title}</strong>
                            <p>{item.excerpt}</p>
                        </Link>
                    ))}
                </div>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = await getPrismicClient();

    const response = await prismic.get({
        predicates: Prismic.predicate.at("document.type", "post"),
        fetch: ["post.title", "post.content"],
        pageSize: 100,
    });

    const posts = response.results.map((post) => ({
        slug: post.uid,
        title: PrismicH.asText(post.data.title),
        excerpt:
            post.data.content.find(
                (content: { type: string }) => content.type === "paragraph"
            )?.text ?? "",
        updatedAt: new Date(post.first_publication_date).toLocaleDateString(
            "pt-BR",
            {
                day: "2-digit",
                month: "long",
                year: "numeric",
            }
        ),
    }));
    return {
        props: { posts },
        revalidate: 60 * 30, // 30min
    };
};
