import { AuthTokenError } from "@/services/errors/auth-token-error";
import jwtDecode from "jwt-decode";
import { GetServerSideProps } from "next";
import { destroyCookie, parseCookies } from "nookies";
import { validateUserPermissions } from "./validate-user-permissions";

type WithSSRAuthOptions = {
    permissions?: string[];
    roles?: string[];
};

export function withSSRAuth<T extends Record<string, any>>(
    fn: GetServerSideProps<T>,
    options?: WithSSRAuthOptions
): GetServerSideProps<T> {
    return async (ctx) => {
        const cookies = parseCookies(ctx);
        const token = cookies["next-auth.token"];

        if (!token) {
            return {
                redirect: {
                    permanent: false,
                    destination: "/",
                },
            };
        }

        if (options) {
            const user: { roles: string[]; permissions: string[] } =
                jwtDecode(token);
            const userHasValidPermissions = validateUserPermissions({
                user,
                roles: options?.roles,
                permissions: options?.permissions,
            });

            if (!userHasValidPermissions) {
                return {
                    redirect: {
                        destination: "/dashboard",
                        permanent: false,
                    },
                };
            }
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
