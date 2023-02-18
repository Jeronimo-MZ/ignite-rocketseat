import { render, screen } from "@testing-library/react";

import Home, { getStaticProps } from "@/pages";
import { stripe } from "@/service/stripe";
import { randomUUID } from "crypto";

jest.mock("next-auth/react", () => ({
    useSession: jest
        .fn()
        .mockResolvedValue({ data: null, status: "unauthenticated" }),
}));

jest.mock("next/router", () => ({ useRouter: jest.fn() }));

jest.mock("@/service/stripe");

describe("Home Page", () => {
    it("should render correct subscription price", () => {
        render(<Home product={{ amount: "R$10,00", priceId: "price-id" }} />);
        expect(screen.getByText(/R\$10,00/i));
    });

    it("should load initial data correctly", async () => {
        const priceId = randomUUID();
        stripe.prices.retrieve = jest.fn().mockResolvedValueOnce({
            id: priceId,
            unit_amount: 1000,
        });

        const response = await getStaticProps({});
        expect(response).toMatchObject({
            props: {
                product: {
                    amount: "$10.00",
                    priceId,
                },
            },
        });
    });
});
