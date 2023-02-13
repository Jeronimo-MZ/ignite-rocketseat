import { Card, Container } from "./styles";

import incomeImage from "../../assets/income.svg";
import outcomeImage from "../../assets/outcome.svg";
import totalImage from "../../assets/total.svg";
import { useTransactions } from "../../hooks/use-transactions";
import { Transaction } from "../../models";
import { formatMoney } from "../../utils";

function summarizeTransactions(transactions: Transaction[]) {
    let income = 0;
    let outcome = 0;
    for (let transaction of transactions) {
        if (transaction.type === "deposit") income += transaction.amount;
        else outcome += transaction.amount;
    }
    return { income, outcome, total: income - outcome };
}

export function Summary() {
    const { transactions } = useTransactions();

    const { income, outcome, total } = summarizeTransactions(transactions);
    return (
        <Container>
            <Card>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImage} alt="Entradas" />
                </header>
                <strong>{formatMoney(income)}</strong>
            </Card>
            <Card>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImage} alt="Saídas" />
                </header>
                <strong> {formatMoney(-outcome)}</strong>
            </Card>
            <Card className="highlight">
                <header>
                    <p>Total</p>
                    <img src={totalImage} alt="Total" />
                </header>
                <strong> {formatMoney(total)}</strong>
            </Card>
        </Container>
    );
}
