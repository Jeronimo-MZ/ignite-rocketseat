import Post, { getServerSideProps } from "@/pages/posts/[slug]";
import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const post = {
    slug: faker.datatype.uuid(),
    title: faker.random.words(),
    content: faker.lorem.lines(1),
    updatedAt: faker.date.recent().toString(),
};

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
        jest.mocked(useSession).mockReturnValueOnce({
            data: { expires: "", user: {} },
            status: "authenticated",
        });
        const pushMock = jest.fn();
        jest.mocked(useRouter).mockReturnValueOnce({ push: pushMock } as any);
        const result = await getServerSideProps({
            req: {
                cookies: {},
            },
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
});
