import { api } from "@/services/api";
import { useRouter } from "next/router";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { setCookie } from "nookies";

type SignInCredentials = {
    email: string;
    password: string;
};
type AuthContextData = {
    signIn(credentials: SignInCredentials): Promise<void>;
    isAuthenticated: boolean;
    user: User | null;
};

const AuthContext = createContext({} as AuthContextData);

type User = {
    email: string;
    permissions: string[];
    roles: string[];
};
export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);
    const isAuthenticated = !!user;
    const router = useRouter();

    const signIn = async ({ email, password }: SignInCredentials) => {
        try {
            const response = await api.post("/sessions", {
                email,
                password,
            });
            const { permissions, roles, token, refreshToken } = response.data;
            setUser({ email, permissions, roles });
            setCookie(null, "next-auth.token", token, {
                maxAge: 60 * 60 * 24 * 30, //30 days
                path: "/",
            });
            setCookie(null, "next-auth.refresh-token", refreshToken, {
                maxAge: 60 * 60 * 24 * 30,
                path: "/",
            });
            router.push("/dashboard");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}
