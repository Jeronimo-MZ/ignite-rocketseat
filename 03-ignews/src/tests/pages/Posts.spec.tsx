import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import Posts, { getStaticProps } from "@/pages/posts";
import { getPrismicClient } from "@/service/prismic";

jest.mock("@/service/prismic");

const generatePosts = (amount = 5) => {
    const posts = [];
    for (let i = 0; i < amount; i++) {
        posts.push({
            slug: faker.datatype.uuid(),
            title: faker.random.words(),
            excerpt: faker.lorem.lines(),
            updatedAt: faker.date.recent().toString(),
        });
    }
    return posts;
};
const posts = generatePosts();

describe("Posts page", () => {
    it("should render posts", () => {
        render(<Posts posts={posts} />);
        for (let post of posts) {
            expect(screen.getByText(post.title)).toBeInTheDocument();
        }
    });

    it("should load initial data", async () => {
        jest.mocked(getPrismicClient).mockResolvedValueOnce({
            get: jest.fn().mockResolvedValueOnce({
                results: [
                    {
                        uid: "my-new-post",
                        data: {
                            title: [{ type: "heading", text: "My new Post" }],
                            content: [
                                {
                                    type: "paragraph",
                                    text: "lorem ipsum dolor sit amet",
                                },
                            ],
                        },
                        last_publication_date: "2023-02-18T12:00+02:00",
                    },
                ],
            }),
        } as any);

        const result = await getStaticProps({});
        expect(result).toMatchObject({
            props: {
                posts: [
                    {
                        slug: "my-new-post",
                        title: "My new Post",
                        excerpt: "lorem ipsum dolor sit amet",
                        updatedAt: "18 de fevereiro de 2023",
                    },
                ],
            },
        });
    });
});
