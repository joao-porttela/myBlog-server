import {Role} from "../interfaces/enum/Role.js";

export function getRole(role: string): string | "Not Authorised" {
  if (!role || role.length === 0) return Role[Role.USER];

  switch (role) {
    case "ADMIN":
      return Role[Role.ADMIN];

    case "USER":
      return Role[Role.USER];

    default:
      return "Not Authorised";
  }
}
