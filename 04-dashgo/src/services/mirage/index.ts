import { faker } from "@faker-js/faker";
import { createServer, Factory, Model, Response } from "miragejs";

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
            server.createList("user", 200);
        },
        routes() {
            this.namespace = "api";
            this.timing = 750;
            this.get("/users", function (schema, request) {
                const { page = 1, perPage = 10 } = request.queryParams;
                const total: number = schema.all("user").length;
                const pageStart = (Number(page) - 1) * Number(perPage);
                const pageEnd = pageStart + Number(perPage);
                // @ts-expect-error
                const users = this.serialize(schema.all("user")).users.slice(
                    pageStart,
                    pageEnd
                );
                return new Response(
                    200,
                    { "x-total-count": String(total) },
                    { users }
                );
            });
            this.get("/users/:id");
            this.post("/users");
            this.namespace = "";
            this.passthrough();
        },
    });

    return server;
};
