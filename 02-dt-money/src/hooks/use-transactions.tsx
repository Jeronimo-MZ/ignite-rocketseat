import { transitions } from "polished";
import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";
import { Transaction } from "../models";
import { api } from "../services/api";

type ContextProps = {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
};

const TransactionsContext = createContext<ContextProps>(undefined as any);

type TransactionInput = Omit<Transaction, "id" | "createdAt">;

export const TransactionsProvider = ({ children }: PropsWithChildren) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    useEffect(() => {
        api.get("transactions").then((response) =>
            setTransactions(response.data.transactions)
        );
    }, []);

    const createTransaction = async (transaction: TransactionInput) => {
        const { data } = await api.post<{ transaction: Transaction }>(
            "transactions",
            { ...transaction, createdAt: new Date() }
        );
        setTransactions((prev) => [data.transaction, ...prev]);
    };

    return (
        <TransactionsContext.Provider
            value={{ transactions, createTransaction }}
        >
            {children}
        </TransactionsContext.Provider>
    );
};

export function useTransactions() {
    const context = useContext(TransactionsContext);
    if (!context)
        throw new Error(
            `${useTransactions.name} must be called within a ${TransactionsProvider.name} `
        );
    return context;
}
