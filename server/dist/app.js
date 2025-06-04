import express from "express";
import { config } from "dotenv";
import { initDB } from "./db.js";
import commentsRouter from "./routes/comment.route.js";
import { errorHandler } from "./middleware/error.js";
const app = express();
app.use(express.json());
config();
const port = process.env.PORT;
app.use("/api/comments", commentsRouter);
app.use(errorHandler);
app.listen(port, async () => {
    await initDB();
    console.log("server is listening on port ", port);
});
