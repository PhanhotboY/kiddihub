import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import 'express-async-errors';
import { v4 as uuid } from 'uuid';

import '@utils/interface';
import { logger } from '@loggers/logger.log';
import { errorHandler, notFoundHandler } from '@middlewares/error.middleware';
import path from 'path';

require('dotenv').config();

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      },
    },
    crossOriginResourcePolicy: false,
  })
);
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || process.env.ALLOWED_ORIGINS?.split(',').includes(origin)) {
        callback(null, true);
      } else callback(new Error('Not allowed by CORS'));
    },
    // origin: process.env.ALLOWED_ORIGINS?.split(','),
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'x-client-id',
      'x-refresh-token',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);
app.use(morgan('dev'));
// app.use(express.static('public'));

// Serve static files with CORS
app.use(
  '/uploads',
  express.static(path.join(__dirname, '../public/uploads'), {
    setHeaders: (res, path) => {
      res.setHeader('Content-Disposition', 'attachment');
      res.setHeader('Cache-Control', 'public, max-age=31536000');
    },
  })
);

//connect to database
require('./db/init.mongodb');
// require('./db/init.redis');

app.use((req, res, next) => {
  const requestId = (req.headers['x-request-id'] as string) || uuid();
  req.requestId = requestId;

  res.setHeader('x-request-id', requestId);

  logger.info('Incoming request', {
    context: req.path,
    requestId,
    metadata: req.method === 'GET' ? req.query : req.body,
  });

  next();
});

// init routers
app.use(express.Router().use('/api/v1', require('./api/routers')));

// Format not found requests response
app.use('*', notFoundHandler);
app.use(errorHandler);

export { app };
