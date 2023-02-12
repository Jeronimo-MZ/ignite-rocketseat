import { Button, Container, Content, Logo } from "./styles";

import logoImg from "../../assets/logo.svg";
export function Header() {
    return (
        <Container>
            <Content>
                <Logo src={logoImg} alt="dt money logo" />
                <Button>Nova transação</Button>
            </Content>
        </Container>
    );
}
