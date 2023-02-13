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
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
