import {
  formatAttributeName,
  getReturnData,
  removeNestedNullish,
} from '@utils/index';
import { NotFoundError } from '../core/errors';
import { IUserAttrs } from '../interfaces/user.interface';
import { UserModel } from '../models/user.model';
import bcrypt from 'bcrypt';
import { USER } from '../constants';

const changePassword = async (userId: string, password: string) => {
  if (!password) throw new NotFoundError('Password not provided');

  const foundUser = await UserModel.findOne({ _id: userId });
  if (!foundUser) {
    throw new NotFoundError('User not found');
  }

  const user = await UserModel.findOneAndUpdate(
    { _id: userId },
    {
      usr_password: await bcrypt.hash(password, foundUser.usr_salt),
    },
    {
      new: true,
    }
  );
  if (!user) throw new NotFoundError('User not found');
  return getReturnData(user);
};

const updateUser = async (userId: string, user: IUserAttrs) => {
  if (user.password) {
    await changePassword(userId, user.password);
    delete user.password;
  }

  const foundUser = await UserModel.findOneAndUpdate(
    { _id: userId },
    removeNestedNullish(formatAttributeName(user, USER.PREFIX)),
    {
      new: true,
    }
  );
  if (!foundUser) throw new NotFoundError('foundUser not found');
  return getReturnData(user);
};

const getCurrentUser = async (userId: string) => {
  const user = await UserModel.findById(userId, [
    '-usr_password',
    '-usr_salt',
    '-__v',
  ]);
  if (!user) throw new NotFoundError('User not found');
  return getReturnData(user);
};

export { changePassword, updateUser, getCurrentUser };
