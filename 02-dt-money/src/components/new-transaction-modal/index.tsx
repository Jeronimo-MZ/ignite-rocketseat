import ReactModal from "react-modal";

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
        <ReactModal isOpen={isOpen} onRequestClose={onRequestClose}>
            <h1>Modal</h1>
        </ReactModal>
    );
}
