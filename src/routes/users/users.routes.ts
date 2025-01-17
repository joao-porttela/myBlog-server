import {Router} from "express";

// Controllers
import {UserController} from "../../03/controllers/user/user.controller.js";

// Interfaces
import {IUserController} from "../../struct/interfaces/controllers/user/userController.interface.js";

// Types
import {ResponseType} from "../../struct/types/response.type.js";
import {RBAC} from "../middleware/rbac.js";
import {Role} from "../../struct/interfaces/enum/Role.js";

const userController: IUserController = new UserController();

const usersRouter: Router = Router();

usersRouter.post("/find-by-id", async (req, res): Promise<any> => {
  const response: ResponseType = await userController.findUserById(req);

  return res.json(response);
});

// Made only for the user, needs password veryfication
usersRouter.delete(
  "/delete-user",
  async (req, res, next): Promise<any> => await RBAC(req, res, next, [Role[Role.USER]]),
  async (req, res): Promise<any> => {
    const response: ResponseType = await userController.deleteUser(req);

    return res.json(response);
  }
);

// Made only for the admin
usersRouter.get(
  "/get-all",
  async (req, res, next): Promise<any> => await RBAC(req, res, next, [Role[Role.ADMIN]]),
  async (_, res): Promise<any> => {
    const response: ResponseType = await userController.getUsers();

    return res.json(response);
  }
);

export {usersRouter};
