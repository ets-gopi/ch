import express, { Application, NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { requestIdMiddleware, requestMessageMiddleware } from './middlewares';
import { ErrorConstants } from '@common/constants/src';
const v1Routes = require('./routes');

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

// Use the request ID middleware before all routes.
app.use(requestIdMiddleware);

// Use this for a structured response format.
app.use(requestMessageMiddleware);

app.use('/', v1Routes);

// Handle 404 errors (Unknown Routes)
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404, { message: `Route ${req.method} ${req.url} not found`, errorCode: ErrorConstants.ERROR_ROUTE_NOT_FOUND }));
});

// Global Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  res.locals.responseMessage.responseError(req, res, statusCode, err.message, err.error || null, err.errorCode, res.locals.requestId);
});

export default app;
