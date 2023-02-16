import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export type User = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
};

type GetUsersResponse = {
    users: User[];
    totalCount: number;
};

export async function getUsers(page: number): Promise<GetUsersResponse> {
    const { data, headers } = await api.get("users", {
        params: {
            page,
        },
    });
    const users = data.users.map((user: User & { created_at: string }) => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: new Date(user.created_at).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            }),
        };
    });

    const totalCount = Number(headers["x-total-count"]);
    return { users, totalCount };
}

export function useUsers(page: number) {
    return useQuery({
        queryKey: ["users", page],
        queryFn: async () => {
            return await getUsers(page);
        },
        staleTime: 1000 * 60 * 10, // 10 minutes
    });
}
