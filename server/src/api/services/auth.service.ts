import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

import { TEMPLATE, USER } from '../constants';
import { getReturnData } from '../utils';
import { createTokenPair, generateKeyPair } from '../auth/authUtils';
import { IUserAttrs, IUserJWTPayload } from '../interfaces/user.interface';
import { IKeyToken, IKeyTokenAttrs } from '../interfaces/keyToken.interface';
import {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
} from '../core/errors';
import {
  removeKeyById,
  createKeyToken,
  updateRefreshToken,
} from './keyToken.service';
import { createUser, findUserById } from '../models/repositories/user.repo';
import { UserModel } from '../models/user.model';
import { sendVerificationEmail, sendTempPassEmail } from './email.service';
import { deleteOTPByEmail, getOTPByToken } from './otp.service';

export class AuthService {
  static async signIn({
    username,
    password,
    refreshToken = null,
  }: {
    username: string;
    password: string;
    refreshToken: string | null;
  }) {
    const foundUser = await findUserById(username);

    if (!foundUser) {
      throw new BadRequestError('Email is not registered!');
    }

    const isMatchPwd = bcrypt.compareSync(password, foundUser.usr_password);

    if (!isMatchPwd) {
      throw new BadRequestError('Authentication failed!');
    }

    const { privateKey, publicKey } = generateKeyPair();

    const tokens = createTokenPair({
      payload: { userId: foundUser.id, email: foundUser.usr_email },
      privateKey,
      publicKey,
    });

    const keyTokenAttrs: IKeyTokenAttrs = {
      user: foundUser.id,
      privateKey,
      publicKey,
      refreshToken: tokens.refreshToken,
    };

    if (refreshToken) keyTokenAttrs.refreshTokensUsed = [refreshToken];

    await createKeyToken(keyTokenAttrs);

    return {
      user: getReturnData(foundUser, {
        fields: [
          'id',
          'usr_firstName',
          'usr_lastName',
          'usr_email',
          'usr_msisdn',
        ],
      }),
      tokens,
    };
  }

  static async signUp({ email }: IUserAttrs) {
    const foundUser = await UserModel.findOne({ usr_email: email });
    if (foundUser) {
      throw new Error('Email already exists');
    }

    return await sendVerificationEmail(email);
  }

  static async verifyEmailToken({ token }: { token: string }) {
    if (!token) {
      throw new BadRequestError('Invalid token');
    }

    const foundOtp = await getOTPByToken(token);
    if (!foundOtp) {
      throw new BadRequestError('Invalid token');
    }
    const { otp_email: email } = foundOtp;
    await deleteOTPByEmail(email);

    const foundUser = await UserModel.findOne({ usr_email: email });
    if (foundUser) {
      throw new BadRequestError('Email already exists');
    }

    const salt = bcrypt.genSaltSync(10);
    const tempPass = randomBytes(8).toString('hex');
    const hashPassword = await bcrypt.hash(tempPass, salt);

    const newUser = await createUser({
      email,
      username: email,
      password: hashPassword,
      salt: salt,
      firstName: email.split('@')[0],
      lastName: '',
      slug: email.split('@')[0],
      status: USER.STATUS.ACTIVE,
    });

    if (!newUser) {
      throw new InternalServerError('Fail to create new user!');
    }

    await sendTempPassEmail(email, { username: email, password: tempPass });

    return {
      ok: true,
    };
  }

  static async signOut(id: string) {
    return await removeKeyById(id);
  }

  static async refreshTokenHandler({
    keyToken,
    refreshToken,
    user,
  }: {
    keyToken: IKeyToken;
    refreshToken: string;
    user: IUserJWTPayload;
  }) {
    // Check if refreshToken has been used?
    if (keyToken.refreshTokensUsed.includes(refreshToken)) {
      // The token is used for the second time => malicious behavior => require user to log in again
      await removeKeyById(keyToken._id as string);
      throw new ForbiddenError(
        'Something wrong happened. Please login again!!'
      );
    }

    // The token is used for the first time => valid
    // Token not exists in DB
    if (keyToken.refreshToken !== refreshToken)
      throw new BadRequestError('Invalid request.');

    // Token exists in DB
    const tokens = createTokenPair({
      payload: user,
      privateKey: keyToken.privateKey,
      publicKey: keyToken.publicKey,
    });

    await updateRefreshToken(keyToken, refreshToken, tokens.refreshToken);

    return tokens;
  }
}
