import { render, screen, fireEvent } from "@testing-library/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SubscribeButton } from "./index";

jest.mock("next/router", () => ({
    useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

jest.mock("next-auth/react", () => ({
    useSession: jest.fn().mockReturnValue({
        data: {
            user: { name: "FAKE NAME" },
            activeSubscription: "SUBSCRIPTION",
            expires: "",
        },
        status: "authenticated",
    }),
    signIn: jest.fn(),
}));

describe("SubscribeButton", () => {
    it("should render correctly", () => {
        render(<SubscribeButton />);
        expect(screen.getByText("Subscribe now")).toBeInTheDocument();
    });

    it("should redirect user to sign in if user is not authenticated", () => {
        jest.mocked(useSession).mockReturnValueOnce({
            data: null,
            status: "unauthenticated",
        });
        render(<SubscribeButton />);
        const subscribeButton = screen.getByText("Subscribe now");
        fireEvent.click(subscribeButton);
        expect(signIn).toHaveBeenCalledTimes(1);
    });

    it("should redirect to /posts if user already has a subscription", async () => {
        const pushMock = jest.fn();
        jest.mocked(useRouter).mockReturnValue({ push: pushMock } as any);
        render(<SubscribeButton />);
        const subscribeButton = screen.getByText("Subscribe now");
        fireEvent.click(subscribeButton);
        expect(pushMock).toHaveBeenCalledWith("/posts");
    });
});
