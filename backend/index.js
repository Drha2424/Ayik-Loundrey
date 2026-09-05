import express from 'express';
import pinoHttp from 'pino-http';
import cors from 'cors';
import 'dotenv/config';

import logger from './configs/logger.config.js';
import router from './routes/index.route.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(pinoHttp({ logger }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express HANYA melayani API
app.use('/api', router);

// Error Handler
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
  });
}

export default app;