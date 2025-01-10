import {Router} from "express";

// Routers
import {usersRouter} from "../users/users.routes.js";
import {authRouter} from "../auth/auth.router.js";

const apiRouter: Router = Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/auth", authRouter);

export {apiRouter};
