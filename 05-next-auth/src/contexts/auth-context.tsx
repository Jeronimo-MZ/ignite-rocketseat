import { api } from "@/services/api";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type SignInCredentials = {
    email: string;
    password: string;
};
type AuthContextData = {
    signIn(credentials: SignInCredentials): Promise<void>;
    isAuthenticated: boolean;
};

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [isAuthenticated] = useState(false);

    const signIn = async ({ email, password }: SignInCredentials) => {
        try {
            const response = await api.post("/sessions", { email, password });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <AuthContext.Provider value={{ signIn, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}
