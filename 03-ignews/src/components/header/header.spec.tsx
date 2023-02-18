import { render } from "@testing-library/react";
import { Header } from "./index";

jest.mock("next/router", () => ({
    useRouter: () => ({ asPath: "/" }),
}));

jest.mock("next-auth/react", () => ({
    useSession: () => ({ data: null, status: "unauthenticated" }),
}));

describe("Header", () => {
    it("should render correctly", () => {
        const { getByText } = render(<Header />);
        expect(getByText("Home")).toBeInTheDocument();
        expect(getByText("Posts")).toBeInTheDocument();
    });
});
