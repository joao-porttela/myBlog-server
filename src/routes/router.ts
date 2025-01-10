import {Router} from "express";

// Routers
import {apiRouter} from "./api/api.router.js";

const router: Router = Router();

router.use("/api", apiRouter);

export {router};
