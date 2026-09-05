import express from 'express';
import pinoHttp from 'pino-http';
import logger from './backend/configs/logger.config.js';
import router from './backend/routes/index.route.js';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

app.use(pinoHttp({ logger }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    logger.info(`Loundrey API is running at http://localhost:${port}`);
    logger.info('Application started successfully');
  });
}

export default app;
