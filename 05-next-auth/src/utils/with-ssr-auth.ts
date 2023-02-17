import { AuthTokenError } from "@/services/errors/auth-token-error";
import { GetServerSideProps } from "next";
import { destroyCookie, parseCookies } from "nookies";

export function withSSRAuth<T extends Record<string, any>>(
    fn: GetServerSideProps<T>
): GetServerSideProps<T> {
    return async (ctx) => {
        const cookies = parseCookies(ctx);

        if (!cookies["next-auth.token"]) {
            return {
                redirect: {
                    permanent: false,
                    destination: "/",
                },
            };
        }

        try {
            return await fn(ctx);
        } catch (error) {
            if (error instanceof AuthTokenError) {
                destroyCookie(ctx, "next-auth.token");
                destroyCookie(ctx, "next-auth.refresh-token");
                return {
                    redirect: {
                        destination: "/",
                        permanent: false,
                    },
                };
            }
            throw error;
        }
    };
}
