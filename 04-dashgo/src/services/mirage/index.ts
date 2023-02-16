import { faker } from "@faker-js/faker";
import { createServer, Factory, Model } from "miragejs";

type User = {
    name: string;
    email: string;
    created_at: string;
};

export const makeServer = () => {
    const server = createServer({
        models: {
            user: Model.extend<Partial<User>>({}),
        },
        factories: {
            user: Factory.extend({
                name(index) {
                    return `${faker.name.fullName()} (${index})`;
                },
                email() {
                    return faker.internet.email();
                },
                createdAt() {
                    return faker.date.recent(20);
                },
            }),
        },
        seeds(server) {
            server.createList("user", 10);
        },
        routes() {
            this.namespace = "api";
            this.timing = 750;
            this.get("/users");
            this.post("/users");
            this.namespace = "";
            this.passthrough();
        },
    });

    return server;
};
