import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors());
// Parse JSON bodies
app.use(express.json());
app.use("/api/v1/users", userRoutes);
export { app };
