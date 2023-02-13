import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createServer, Model } from "miragejs";

createServer({
    models: {
        transaction: Model.extend({}),
    },
    routes() {
        this.namespace = "/api";
        this.urlPrefix = "http://localhost:3000";
        this.get("transactions", () => this.schema.all("transaction"));
        this.post("transactions", (schema, request) => {
            const data = JSON.parse(request.requestBody);
            return schema.create("transaction", data);
        });
    },
    seeds(server) {
        server.db.loadData({
            transactions: [
                {
                    id: 1,
                    title: "Desenvolvimento de Website",
                    amount: 4000,
                    type: "deposit",
                    category: "Development",
                    createdAt: new Date("2023-01-12 12:30:00"),
                },
                {
                    id: 2,
                    title: "Aluguel",
                    amount: 2000,
                    type: "withdraw",
                    category: "Casa",
                    createdAt: new Date("2023-02-01 14:30:00"),
                },
            ],
        });
    },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
