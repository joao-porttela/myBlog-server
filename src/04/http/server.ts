import {App} from "../../app.js";
import "dotenv/config";

const port = process.env.PORT || 8080;

const app =
  (globalThis as any).app ||
  new App().server.listen(port, () => console.log(`Running server on port: ${port}`));

if (process.env.NODE_ENV !== "production") (globalThis as any).app = app;
