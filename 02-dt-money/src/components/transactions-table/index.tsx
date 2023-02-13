import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { formatDate, formatMoney } from "../../utils";
import { Container } from "./styles";

type Transaction = {
    id: number;
    title: string;
    amount: number;
    category: string;
    type: "withdraw" | "deposit";
    createdAt: string;
};
export function TransactionsTable() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    useEffect(() => {
        api.get("transactions").then((response) =>
            setTransactions(response.data.transactions)
        );
    }, []);
    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.title}</td>
                            <td className={transaction.type}>
                                {formatMoney(transaction.amount)}
                            </td>
                            <td>{transaction.category}</td>
                            <td>{formatDate(transaction.createdAt)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    );
}
