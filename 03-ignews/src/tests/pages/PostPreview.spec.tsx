import PostPreview, { getStaticProps } from "@/pages/posts/preview/[slug]";
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
        jest.mocked(useSession).mockReturnValueOnce({
            data: null,
            status: "unauthenticated",
        });
        render(<PostPreview post={post} />);
        expect(screen.getByText(post.title)).toBeInTheDocument();
        expect(screen.getByText(post.content)).toBeInTheDocument();
        expect(screen.getByText(post.updatedAt)).toBeInTheDocument();
        expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
    });

    it("should redirect user to full post if user already have a subscription", async () => {
        jest.mocked(useSession).mockReturnValueOnce({
            data: {
                expires: "",
                user: {},
                activeSubscription: "FAKE_SUB",
            } as any,
            status: "authenticated",
        });
        const pushMock = jest.fn();
        jest.mocked(useRouter).mockReturnValueOnce({ push: pushMock } as any);
        render(<PostPreview post={post} />);
        expect(pushMock).toHaveBeenCalledWith(`/posts/${post.slug}`);
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
                            text: "Lorem",
                            spans: [],
                        },
                        {
                            type: "paragraph",
                            text: "ipsum",
                            spans: [],
                        },
                        {
                            type: "paragraph",
                            text: "dolor",
                            spans: [],
                        },
                        {
                            type: "paragraph",
                            text: "sit amet",
                            spans: [],
                        },
                    ],
                },
                last_publication_date: "2023-02-18T12:00+02:00",
            }),
        } as any);
        const result = await getStaticProps({
            params: { slug: post.slug },
        } as any);
        expect(result).toEqual({
            props: {
                post: {
                    slug: post.slug,
                    title: "My new Post",
                    content: "<p>Lorem</p><p>ipsum</p><p>dolor</p>",
                    updatedAt: "18 de fevereiro de 2023",
                },
            },
        });
    });

    it("should return 404 if getByUID rejects", async () => {
        jest.mocked(getSession).mockResolvedValueOnce({
            expires: "",
            user: {},
            activeSubscription: "FAKE_SUB",
        } as any);
        jest.mocked(getPrismicClient).mockResolvedValueOnce({
            getByUID: jest.fn().mockRejectedValueOnce(new Error()),
        } as any);
        const result = await getStaticProps({
            params: { slug: post.slug },
        } as any);
        expect(result).toEqual({
            notFound: true,
        });
    });
});
