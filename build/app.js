import express from "express";
import { router } from "./routes/router.js";
export class App {
    server;
    constructor() {
        this.server = express();
        this.middleware();
        this.router();
    }
    middleware() {
        this.server.use(express.json());
    }
    router() {
        this.server.use(router);
    }
}
