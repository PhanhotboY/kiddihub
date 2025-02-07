import { HydratedDocument, Model, Types } from 'mongoose';
import { USER } from '../constants';

export interface IRawUser {
  usr_id: Types.ObjectId;
  usr_username: string;
  usr_slug: string;
  usr_firstName: string;
  usr_lastName: string;
  usr_email: string;
  usr_password: string;
  usr_salt: string;
  usr_msisdn: string;
  usr_sex: string;
  usr_avatar: string;
  usr_birthdate: Date;
  usr_address: string;
  usr_status: Values<typeof USER.STATUS>;
}

export interface IUser extends HydratedDocument<IRawUser> {}

export interface IUserAttrs {
  id?: string;
  username: string;
  slug: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  salt?: string | number;
  msisdn?: string;
  sex?: string;
  avatar?: string;
  birthdate?: Date;
  address?: string;
  status: Values<typeof USER.STATUS>;
}

export interface IUserModel extends Model<IUser> {
  build(attrs: IUserAttrs): Promise<IUser>;
}

export interface IUserJWTPayload {
  userId: string;
  email: string;
}

export interface IUserResponseData {
  id: string;
  username: string;
  slug: string;
  firstName: string;
  lastName: string;
  email: string;
  msisdn?: string;
  sex: string;
  avatar: string;
  address: string;
  birthdate: Date;
}
