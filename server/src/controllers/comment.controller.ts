import { Request, Response } from "express";
import pool from "../db.js";

export const getComments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const { rows } = await pool.query(
      `SELECT * FROM comments WHERE movieId = $1`,
      [id]
    );

    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { comment, movieId, username } = req.body;

    if (!comment || !movieId || !username) {
      res.status(400).json({
        success: false,
        message: "Data is missing",
      });
      return;
    }

    const result = await pool.query(
      "INSERT INTO comments(comment, username, movieId) VALUES($1, $2, $3) RETURNING *",
      [comment, username, movieId]
    );

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.log(err);
  }
};
