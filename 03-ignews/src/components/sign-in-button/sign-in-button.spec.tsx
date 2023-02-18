import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { SignInButton } from "./index";
import { faker } from "@faker-js/faker";

jest.mock("next-auth/react");

describe("SignInButton", () => {
    it("should render correctly when user is not authenticated", () => {
        jest.mocked(useSession).mockReturnValueOnce({
            data: null,
            status: "unauthenticated",
        });
        render(<SignInButton />);
        expect(screen.getByText("Sign in with Github")).toBeInTheDocument();
    });

    it("should render correctly when user is authenticated", () => {
        const name = faker.name.fullName();
        jest.mocked(useSession).mockReturnValueOnce({
            data: { user: { name }, expires: "" },
            status: "authenticated",
        });
        render(<SignInButton />);
        expect(screen.getByText(name)).toBeInTheDocument();
    });
});
