import ReactModal from "react-modal";
import { Container } from "./styles";
import closeImage from "../../assets/close.svg";

ReactModal.setAppElement("#root");

type NewTransactionModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
};

export function NewTransactionModal({
    isOpen,
    onRequestClose,
}: NewTransactionModalProps) {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button
                type="button"
                onClick={onRequestClose}
                className="react-modal-close"
            >
                <img src={closeImage} alt="Fechar modal" />
            </button>
            <Container>
                <h2>Cadastrar Transação</h2>
                <input type="text" placeholder="Título" />
                <input type="number" placeholder="Valor" />
                <input type="text" placeholder="Categoria" />
                <button type="submit">Cadastrar</button>
            </Container>
        </ReactModal>
    );
}
