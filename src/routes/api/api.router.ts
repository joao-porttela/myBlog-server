import {Router} from "express";
import cors, {CorsOptions} from "cors";

// Routers
import {usersRouter} from "../users/users.routes.js";
import {authRouter} from "../auth/auth.router.js";
import {postsRouter} from "../posts/posts.router.js";
import {categoriesRouter} from "../posts/categories.router.js";
import {subCategoriesRouter} from "../posts/subCategories.router.js";

const apiRouter: Router = Router();

const whitelist = ["http://localhost:3000"];
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin!) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

apiRouter.use(
  cors({
    origin: whitelist,
  })
);

apiRouter.use("/users", usersRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/post", postsRouter);
apiRouter.use("/category", categoriesRouter);
apiRouter.use("/sub-category", subCategoriesRouter);

export {apiRouter};
