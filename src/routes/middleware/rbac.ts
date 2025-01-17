import {Request, Response, NextFunction} from "express";
import jwt, {Secret} from "jsonwebtoken";

import {getRole} from "../../helper/role.js";

import {Role} from "../../struct/interfaces/enum/Role.js";
import {userRepository} from "../../04/database/repository/users.respository.js";

export const PRIVATE_KEY: Secret = process.env.PRIVATE_KEY!;

export async function RBAC(
  req: Request,
  res: Response,
  next: NextFunction,
  permissions: string[]
): Promise<any> {
  // 1) Getting token and check if it's there
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token)
    return res.json({
      statusCode: 400,
      status: "Fail",
      message: "No token",
      error: true,
    });

  // 2) Verification token
  const decoded = jwt.verify(token, PRIVATE_KEY);
  const id: string = (<{sub: string}>decoded).sub;

  // 3) Check if user still exists
  const currentUser = await userRepository.findById(id);

  if (!currentUser)
    return res.json({
      statusCode: 404,
      status: "Fail",
      message: "User not found",
      error: true,
    });

  // Check if permissions role is valid ("ADMIN" or "USER")
  if (!permissions.includes(Role[Role.ADMIN]) && !permissions.includes(Role[Role.USER])) {
    return res.json({
      statusCode: 400,
      status: "Fail",
      message: "Not Authorised permission role",
      error: true,
    });
  }

  const rl: string | "Not Authorised" = getRole(currentUser.role);

  if (
    (rl === Role[Role.ADMIN] && permissions.includes(Role[Role.ADMIN])) ||
    (rl === Role[Role.USER] && permissions.includes(Role[Role.USER]))
  )
    return next();

  return res.json({
    statusCode: 400,
    status: "Fail",
    message: "Not authorised",
    error: true,
  });
}
