import { User } from "../types.ts";

declare namespace Express {
  export interface Request {
    user?: User;
  }
}
