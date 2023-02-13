export type Transaction = {
    id: number;
    title: string;
    amount: number;
    category: string;
    type: "withdraw" | "deposit";
    createdAt: string;
};
