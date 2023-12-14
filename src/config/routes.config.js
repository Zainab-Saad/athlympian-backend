import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import { logger } from './winston.config.js';
import { authRouter } from '../routes/auth.route.js';

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(authRouter);

app.listen(process.env.PORT, () => {
  logger.info(`server running at port ${process.env.PORT}`);
});
