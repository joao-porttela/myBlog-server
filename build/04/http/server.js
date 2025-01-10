import { App } from "../../app.js";
const port = process.env.PORT || 8080;
const app = globalThis.app ||
    new App().server.listen(port, () => console.log(`Running server on port: ${port}`));
if (process.env.NODE_ENV !== "production")
    globalThis.app = app;
