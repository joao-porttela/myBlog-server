import { Router } from "express";
import { usersRouter } from "./users/users.router.js";
const router = Router();
router.use("/api", usersRouter);
export { router };
