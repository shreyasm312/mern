import express from 'express';
import chalk from 'chalk';
import { logger, morganLogs, gracefulExit, handleBodyRequestParsing, security } from './lib';
import config from './config';
import { connect } from './utils/db';
import { protect } from './utils/auth';

export const start = async () => {
  process
    .on('SIGINT', gracefulExit)
    .on('SIGTERM', gracefulExit)
    .on('uncaughtException', gracefulExit)
    .on('unhandledRejection', gracefulExit);
  const app = express();
  security(app);
  handleBodyRequestParsing(app);
  morganLogs(app);
  app.get('/', (_req, res) => res.status(200).json({ message: 'Hello from user service 👨' }));
  try {
    connect();
    app.listen(config.port, () => {
      logger.info(chalk.hex('#009688').bold(`[👨 User Server started ]`));
    });
  } catch (error) {
    logger.error(error);
  }
};
