import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export type User = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
};

export async function getUsers(): Promise<User[]> {
    const { data } = await api.get("users");
    const users = data.users.map((user: User) => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            }),
        };
    });
    return users;
}

export function useUsers() {
    return useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            return await getUsers();
        },
        staleTime: 5 * 1000, // 5 seconds,
    });
}
