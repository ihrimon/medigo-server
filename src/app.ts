import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from './app/config';
import notFound from './app/middlewares/notFound';
import { globalErrorHandler } from './app/middlewares';
import router from './app/routes';

/*** 'Cycle Planet Store' application ***/
const app: Application = express();

// parsers
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      config.client_local_url as string,
    //   config.client_host_url as string,
    ],
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control'],
    credentials: true,
  })
);
app.options('*', cors());
app.use(express.json());

// application route for all api's
app.use('/api', router);

// root route
app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Welcome to Cycle Planet Store 🚀',
  });
});

// handle all error occurs
app.use(globalErrorHandler);

// handle not found error
app.use(notFound);

export default app;
