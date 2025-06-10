import { NextFunction, Request, Response } from "express";
import { AppError } from "./error.js";
import jwt from "jsonwebtoken";
import pool from "../db.js";

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      console.log("token is : ", token);

      const decodedUser = jwt.verify(
        token,
        process.env.NEXTAUTH_SECRET || "hello_world"
      );

      if (typeof decodedUser === "object") {
        const email = decodedUser.email;

        const { rows } = await pool.query(
          "SELECT * FROM users WHERE email = $1",
          [email]
        );

        if (rows.length) {
          req.user = rows[0];
        } else {
          return next(new AppError(400, "User not found"));
        }
        next();
      } else {
        return next(new AppError(400, "Something went wrong"));
      }
    } else {
      return next(new AppError(401, "Unauthorized"));
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export default isAuthenticated;
