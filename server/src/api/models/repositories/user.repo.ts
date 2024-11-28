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

export { getAllUsers, createUser, findUserByEmail };
