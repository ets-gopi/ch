import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';

const app: Application = express();

// CORS enables secure cross-origin requests between web applications
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(cookieParser());

// Logging middleware to check cookie data
app.use((req, res, next) => {
  console.log('Cookies:', req.cookies);
  next();
});

app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

export default app;
