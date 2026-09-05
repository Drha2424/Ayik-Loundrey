import express from 'express';
import pinoHttp from 'pino-http';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

import logger from './backend/configs/logger.config.js';
import router from './backend/routes/index.route.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(pinoHttp({ logger }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sajikan file statis (HTML, CSS, JS frontend)
app.use(express.static(path.join(__dirname, 'tampilan-public')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));

// Routing API
app.use('/api', router);

// Halaman utama (root) menampilkan index.html dari tampilan-public
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'tampilan-public', 'index.html'));
});

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