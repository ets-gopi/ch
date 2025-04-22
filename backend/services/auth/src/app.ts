import express from "express";
const v1Routes = require("./routes");

const app = express();
const cors = require("cors");

// CORS enables secure cross-origin requests between web applications
app.use(cors());

app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use("/", v1Routes);

export default app;
