import { getPrismicClient } from "@/service/prismic";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import * as PrismicH from "@prismicio/helpers";
import Head from "next/head";
import styles from "./post.module.scss";
import parse from "html-react-parser";
type PostProps = {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    };
};

export default function Post({ post }: PostProps) {
    return (
        <>
            <Head>
                <title>{post.title} | ig.news</title>
            </Head>
            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div className={styles.content}>{parse(post.content)}</div>
                </article>
            </main>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({
    req,
    params,
}) => {
    const session: any = await getSession({ req });
    const slug = params?.slug as string;

    if (!session?.activeSubscription) {
        return {
            redirect: {
                destination: `/posts/preview/${slug}`,
                permanent: false,
            },
        };
    }

    const prismic = await getPrismicClient();

    const response = await prismic.getByUID("post", slug);

    const post = {
        slug,
        title: PrismicH.asText(response.data.title),
        content: PrismicH.asHTML(response.data.content),
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
