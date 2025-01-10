import { Router } from "express";
import { UserController } from "../../03/controllers/user.controller.js";
const userController = new UserController();
const usersRoute = Router();
usersRoute.post("/sign-up", async (req, res) => {
    const response = await userController.signUp(req);
    return res.json(response);
});
usersRoute.post("/login", async (req, res) => {
    const response = await userController.login(req);
    return res.json(response);
});
usersRoute.get("/get-all", async (req, res) => {
    const response = await userController.getUsers(req);
    return res.json(response);
});
usersRoute.post("/find-by-id", async (req, res) => {
    const response = await userController.findUserById(req);
    return res.json(response);
});
usersRoute.delete("/delete-user", async (req, res) => {
    const response = await userController.deleteUser(req);
    return res.json(response);
});
export { usersRoute };
