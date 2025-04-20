import express from "express";
import userRoutes from "./routes/user.route";

const app = express();
const cors = require("cors");

// CORS enables secure cross-origin requests between web applications
app.use(cors());

app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);

export default app;
