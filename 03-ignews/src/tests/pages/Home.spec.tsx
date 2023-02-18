import { render, screen } from "@testing-library/react";

import Home from "@/pages";

jest.mock("next-auth/react", () => ({
    useSession: jest
        .fn()
        .mockResolvedValue({ data: null, status: "unauthenticated" }),
}));

jest.mock("next/router", () => ({ useRouter: jest.fn() }));

describe("Home Page", () => {
    it("should ", () => {
        render(<Home product={{ amount: "R$10,00", priceId: "price-id" }} />);
        expect(screen.getByText(/R\$10,00/i));
    });
});
