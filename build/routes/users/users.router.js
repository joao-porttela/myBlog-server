import { Router } from "express";
import { usersRoute } from "./users.routes.js";
const usersRouter = Router();
usersRouter.use("/users", usersRoute);
export { usersRouter };
