import { Button, Container, Content, Logo } from "./styles";

import Modal from "react-modal";
import logoImg from "../../assets/logo.svg";
import { useState } from "react";

type HeaderProps = {
    onNewTransactionButtonClick: () => void;
};
export function Header({ onNewTransactionButtonClick }: HeaderProps) {
    return (
        <Container>
            <Content>
                <Logo src={logoImg} alt="dt money logo" />
                <Button onClick={onNewTransactionButtonClick}>
                    Nova transação
                </Button>
            </Content>
        </Container>
    );
}
