import { useState } from "react";
import ReactModal from "react-modal";
import { Header } from "./components/header";
import { NewTransactionModal } from "./components/new-transaction-modal";
import { Dashboard } from "./pages/dashboard";
import { GlobalStyle } from "./styles/global";

function App() {
    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
        useState(false);

    const handleOpenNewTransactionModal = () => {
        setIsNewTransactionModalOpen(true);
    };

    const handleCloseNewTransactionModal = () => {
        setIsNewTransactionModalOpen(false);
    };
    return (
        <>
            <Header
                onNewTransactionButtonClick={handleOpenNewTransactionModal}
            />
            <Dashboard />
            <NewTransactionModal
                isOpen={isNewTransactionModalOpen}
                onRequestClose={handleCloseNewTransactionModal}
            />
            <GlobalStyle />
        </>
    );
}

export default App;
