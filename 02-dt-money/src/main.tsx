import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createServer } from "miragejs";

createServer({
    routes() {
        this.namespace = "/api";
        this.urlPrefix = "http://localhost:3000";
        this.get("transactions", () => [
            {
                id: 1,
                title: "Transaction 1",
                amount: 400,
                type: "deposit",
                category: "food",
                createdAt: new Date(),
            },
        ]);
    },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
