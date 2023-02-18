import { render } from "@testing-library/react";
import { ActiveLink } from "./index";

jest.mock("next/router", () => ({
    useRouter: () => ({ asPath: "/" }),
}));

describe("ActiveLink", () => {
    it("should render correctly", () => {
        const { getByText } = render(
            <ActiveLink href="/" activeClassName="active">
                Home
            </ActiveLink>
        );
        expect(getByText("Home")).toBeInTheDocument();
    });

    it("should add active class if current href matches asPath", () => {
        const { getByText } = render(
            <ActiveLink href="/" activeClassName="active">
                Home
            </ActiveLink>
        );
        expect(getByText("Home")).toHaveClass("active");
    });

    it("should not add active class if current href doesn't match asPath", () => {
        const { getByText } = render(
            <ActiveLink href="/random" activeClassName="active">
                Home
            </ActiveLink>
        );
        expect(getByText("Home")).not.toHaveClass("active");
    });
});
