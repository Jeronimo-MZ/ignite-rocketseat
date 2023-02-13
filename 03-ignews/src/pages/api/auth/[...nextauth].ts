import { fauna } from "@/service/fauna";
import { query as q } from "faunadb";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            authorization: {
                params: {
                    scope: "read:user user:email",
                },
            },
        }),
    ],
    callbacks: {
        async signIn({ user: { email } }) {
            try {
                await fauna.query(
                    q.If(
                        q.Not(
                            q.Exists(
                                q.Match(
                                    q.Index("user_by_email"),
                                    q.Casefold(email as string)
                                )
                            )
                        ),
                        q.Create(q.Collection("users"), { data: { email } }),
                        q.Get(
                            q.Match(
                                q.Index("user_by_email"),
                                q.Casefold(email as string)
                            )
                        )
                    )
                );
                return true;
            } catch (error) {
                return false;
            }
        },
    },
});
