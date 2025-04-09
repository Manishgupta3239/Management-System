import express, { json } from "express";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import ConnectionDb from "./mongodb/connection.js";
import AuthRoutes from "./routes/authRoutes/AuthRoutes.js";
import TaskRoutes from "./routes/taskRoutes/TaskRoutes.js";
import bodyParser from "body-parser";
import UserRoutes from "./routes/userRoutes/UserRoutes.js";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use("/api/auth", AuthRoutes);
app.use("/api/task", TaskRoutes);
app.use("/api/admin", UserRoutes);

app.listen(process.env.PORT, () => {
  ConnectionDb();
});
