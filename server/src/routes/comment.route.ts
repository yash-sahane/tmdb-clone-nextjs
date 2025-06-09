import { Router } from "express";
import { addComment, getComments } from "../controllers/comment.controller.js";
import isAuthenticated from "../middleware/auth.js";

const router = Router();

router.get("/:id", isAuthenticated, getComments);
router.post("/add", isAuthenticated, addComment);

export default router;
