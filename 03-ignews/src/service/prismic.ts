import { getRepositoryEndpoint, createClient } from "@prismicio/client";

export async function getPrismicClient() {
    const repoName = process.env.PRISMIC_APP_NAME as string;
    const endpoint = getRepositoryEndpoint(repoName);

    const prismic = createClient(endpoint, {
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    });
    return prismic;
}
