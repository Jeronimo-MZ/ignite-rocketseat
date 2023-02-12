import { Summary } from "../../components/summary";
import { TransactionsTable } from "../../components/transactions-table";
import { Container } from "./styles";

export function Dashboard() {
    return (
        <Container>
            <Summary />
            <TransactionsTable />
        </Container>
    );
}
