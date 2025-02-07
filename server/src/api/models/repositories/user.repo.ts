import { isValidObjectId } from 'mongoose';
import { IUserAttrs } from '../../interfaces/user.interface';
import { UserModel } from '../user.model';

const getAllUsers = async () => {
  return await UserModel.find();
};

const createUser = async (user: IUserAttrs) => {
  return await UserModel.build(user);
};

const findUserByEmail = async (email: string) => {
  return await UserModel.findOne({ usr_email: email });
};

const findUserById = async (id: string) => {
  if (isValidObjectId(id)) {
    return await UserModel.findById(id);
  }

  return await UserModel.findOne({
    $or: [{ usr_email: id }, { usr_username: id }],
  });
};

export { getAllUsers, createUser, findUserByEmail, findUserById };
