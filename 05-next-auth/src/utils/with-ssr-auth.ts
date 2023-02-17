import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

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
        return await fn(ctx);
    };
}
