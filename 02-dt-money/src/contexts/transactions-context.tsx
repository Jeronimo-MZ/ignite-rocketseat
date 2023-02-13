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
};

const TransactionsContext = createContext<ContextProps>(undefined as any);

export const TransactionsProvider = ({ children }: PropsWithChildren) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    useEffect(() => {
        api.get("transactions").then((response) =>
            setTransactions(response.data.transactions)
        );
    }, []);

    return (
        <TransactionsContext.Provider value={{ transactions }}>
            {children}
        </TransactionsContext.Provider>
    );
};

export function useTransactions() {
    const context = useContext(TransactionsContext);
    console.log(context);
    if (!context)
        throw new Error(
            `${useTransactions.name} must be called within a ${TransactionsProvider.name} `
        );
    return context;
}
