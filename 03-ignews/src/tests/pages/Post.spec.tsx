import Post, { getServerSideProps } from "@/pages/posts/[slug]";
import { getPrismicClient } from "@/service/prismic";
import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const post = {
    slug: faker.datatype.uuid(),
    title: faker.random.words(),
    content: faker.lorem.lines(1),
    updatedAt: faker.date.recent().toString(),
};

jest.mock("@/service/prismic");
jest.mock("next-auth/react");
jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

describe("Post", () => {
    it("should render correctly", () => {
        render(<Post post={post} />);
        expect(screen.getByText(post.title)).toBeInTheDocument();
        expect(screen.getByText(post.content)).toBeInTheDocument();
        expect(screen.getByText(post.updatedAt)).toBeInTheDocument();
    });

    it("should redirect user if user has no subscription", async () => {
        jest.mocked(getSession).mockResolvedValueOnce({
            expires: "",
            user: {},
        } as any);
        const pushMock = jest.fn();
        jest.mocked(useRouter).mockReturnValueOnce({ push: pushMock } as any);
        const result = await getServerSideProps({
            params: {
                slug: post.slug,
            },
        } as any);
        expect(result).toEqual({
            redirect: {
                destination: `/posts/preview/${post.slug}`,
                permanent: false,
            },
        });
    });

    it("should load initial data", async () => {
        jest.mocked(getSession).mockResolvedValueOnce({
            expires: "",
            user: {},
            activeSubscription: "FAKE_SUB",
        } as any);
        jest.mocked(getPrismicClient).mockResolvedValueOnce({
            getByUID: jest.fn().mockResolvedValueOnce({
                uid: "my-new-post",
                data: {
                    title: [{ type: "heading", text: "My new Post" }],
                    content: [
                        {
                            type: "paragraph",
                            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                            spans: [],
                        },
                    ],
                },
                last_publication_date: "2023-02-18T12:00+02:00",
            }),
        } as any);
        const result = await getServerSideProps({
            params: { slug: post.slug },
        } as any);
        expect(result).toEqual({
            props: {
                post: {
                    slug: post.slug,
                    title: "My new Post",
                    content:
                        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>",
                    updatedAt: "18 de fevereiro de 2023",
                },
            },
        });
    });
});
