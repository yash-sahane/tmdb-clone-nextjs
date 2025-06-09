import { NextFunction, Request, Response } from "express";
import pool from "../db.js";
import { AppError } from "../middleware/error.js";

export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email } = await req.body;

    if (!name || !email) {
      next(new AppError(400, "Please provide appropriate details"));
    }

    const { rows } = await pool.query("SELECT * FROM Users WHERE email = $1", [
      email,
    ]);

    if (!rows.length) {
      await pool.query("INSERT INTO Users(email, name) VALUES($1, $2)", [
        email,
        name,
      ]);
    }

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
