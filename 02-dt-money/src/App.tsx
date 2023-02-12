import { Header } from "./components/header";
import { Dashboard } from "./pages/dashboard";
import { GlobalStyle } from "./styles/global";

function App() {
    return (
        <>
            <Header />
            <Dashboard />
            <GlobalStyle />
        </>
    );
}

export default App;
