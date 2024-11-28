import { NextFunction, Request, Response } from 'express';
import logger from '../loggers/discord.log';
import { InternalServerError } from '../core/errors';

function pushLog2Discord(req: Request, res: Response, next: NextFunction) {
  logger
    .sendFormatLog({
      title: req.method.toUpperCase() + ' ' + req.url,
      code: req.method === 'GET' ? req.query : req.body,
      message: req.get('host') + req.originalUrl,
    })
    .then(() => {
      console.log('Log sent to Discord');
    })
    .catch((err) => {
      throw new InternalServerError(err.message);
    });
  next();
}

export { pushLog2Discord };
