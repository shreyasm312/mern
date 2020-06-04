import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import { logger, morganLogs, gracefulExit, handleBodyRequestParsing, security } from './lib';
import config from './config';
import { connect } from './utils/db';
import { protect } from './utils/auth';
import { signup, signin } from './resources/user/user.controllers';
import userRouter from './resources/user/user.router';

export const start = async () => {
  process
    .on('SIGINT', gracefulExit)
    .on('SIGTERM', gracefulExit)
    .on('uncaughtException', gracefulExit)
    .on('unhandledRejection', gracefulExit);
  const app = express();
  app.use(cors());
  handleBodyRequestParsing(app);
  morganLogs(app);
  app.get('/', (_req, res) => res.status(200).json({ message: 'Hello from user service 👨' }));
  app.post('/register', signup);
  app.post('/login', signin);

  app.use('/api', protect);
  app.use('/api/user', userRouter);

  try {
    connect();
    app.listen(config.port, () => {
      logger.info(chalk.hex('#009688').bold(`[👨 User Server started ]`));
    });
  } catch (error) {
    logger.error(error);
  }
};
