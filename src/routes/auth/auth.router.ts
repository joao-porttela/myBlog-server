import {Router} from "express";

// Controllers
import {AuthController} from "../../03/controllers/auth/auth.controller.js";

// Interfaces
import {IAuthController} from "../../struct/interfaces/controllers/auth/authController.interface.js";

// Types
import {ResponseType} from "../../struct/types/response.type.js";

const authController: IAuthController = new AuthController();

const authRouter: Router = Router();

authRouter.post("/sign-up", async (req, res): Promise<any> => {
  const response: ResponseType = await authController.signUp(req);

  return res.json(response);
});

authRouter.post("/login", async (req, res): Promise<any> => {
  const response: ResponseType = await authController.login(req);

  return res.json(response);
});

export {authRouter};
