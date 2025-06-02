import express from "express";
import { config } from "dotenv";
import { initDB } from "./db.js";
const app = express();
config();
const port = process.env.PORT;
app.listen(port, async () => {
    await initDB();
    console.log("server is listening on port ", port);
});
