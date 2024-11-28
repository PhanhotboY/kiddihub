import JWT from 'jsonwebtoken';

import { BadRequestError } from '../core/errors';
import { IUserJWTPayload } from '../interfaces/user.interface';

const parseJwt = (token: string): IUserJWTPayload => {
  try {
    return JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString('utf-8')
    );
  } catch (error) {
    console.error(error);
    throw new BadRequestError('Invalid Request!');
  }
};

const verifyJwt = (token: string, keySecret: string): IUserJWTPayload => {
  try {
    return JWT.verify(token, keySecret) as IUserJWTPayload;
  } catch (error) {
    console.error(error);
    throw new BadRequestError('Invalid Request!');
  }
};

export { parseJwt, verifyJwt };
