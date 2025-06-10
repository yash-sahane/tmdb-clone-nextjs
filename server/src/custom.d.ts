import { User } from "./types.ts";

export {}; // Make this a module

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
