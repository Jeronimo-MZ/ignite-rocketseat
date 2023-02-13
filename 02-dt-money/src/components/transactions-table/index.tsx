import { useTransactions } from "../../contexts/transactions-context";
import { formatDate, formatMoney } from "../../utils";
import { Container } from "./styles";

export function TransactionsTable() {
    const { transactions } = useTransactions();
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
                                {formatMoney(
                                    transaction.type === "deposit"
                                        ? transaction.amount
                                        : -transaction.amount
                                )}
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
