import { Router } from "express";
import { addComment, getComments } from "../controllers/comment.controller.js";

const router = Router();

router.get("/:id", getComments);
router.post("/add", addComment);

export default router;
