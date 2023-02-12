import { Card, Container } from "./styles";

import incomeImage from "../../assets/income.svg";
import outcomeImage from "../../assets/outcome.svg";
import totalImage from "../../assets/total.svg";

export function Summary() {
    return (
        <Container>
            <Card>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImage} alt="Entradas" />
                </header>
                <strong>R$ 1000,00</strong>
            </Card>
            <Card>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImage} alt="Saídas" />
                </header>
                <strong> -R$ 300,00</strong>
            </Card>
            <Card className="highlight">
                <header>
                    <p>Total</p>
                    <img src={totalImage} alt="Total" />
                </header>
                <strong>R$ 700,00</strong>
            </Card>
        </Container>
    );
}
