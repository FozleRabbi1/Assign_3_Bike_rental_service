/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express';
import core from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorHandlear';
import notFound from './app/middleware/notFound';
const app: Application = express();

//parser
app.use(express.json());
app.use(cookieParser());
app.use(core({ origin: ['http://localhost:5173'] }));

// application routes
app.use('/api', router);

app.use(globalErrorHandler);
app.use('*', notFound);

export default app;
