import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import Posts from "@/pages/posts";

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
});
