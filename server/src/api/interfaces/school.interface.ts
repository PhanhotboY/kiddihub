import { HydratedDocument, Model } from 'mongoose';
import { SCHOOL } from '../constants/school.constant';
// import { School } from '../constants';

interface IRawSchool {
  _id: string;
  sch_name: string;
  sch_slug: string;
  sch_avatar: string;
  sch_model: Values<typeof SCHOOL.MODEL>;
  sch_type: Values<typeof SCHOOL.TYPE>;
  sch_program: Values<typeof SCHOOL.PROGRAM>;
  sch_address: {
    province: string;
    district: string;
    street: string;
  };
  sch_age: {
    from: string;
    to: string;
  };
  sch_tuition: {
    from: number;
    to: number;
  };
  sch_information: {
    introduction?: string;
    infrastructure?: string;
    service?: string;
    curriculum?: string;
    workforce?: string;
    policy?: string;
  };
  sch_contact: {
    email: string;
    msisdn: string;
    facebook?: string;
    instagram?: string;
    website?: string;
    map: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export type ISchool = HydratedDocument<IRawSchool>;

export interface ISchoolAttrs {
  name: string;
  slug: string;
  avatar: string;
  model: ISchool['sch_model'];
  type: ISchool['sch_type'];
  program: ISchool['sch_program'];
  address: {
    district: string;
    province: string;
    street: string;
  };
  age: {
    from: string;
    to: string;
  };
  tuition: {
    from: number;
    to: number;
  };
  information: {
    introduction?: string;
    infrastructure?: string;
    service?: string;
    curriculum?: string;
    workforce?: string;
    policy?: string;
  };
  contact: {
    map: string;
    email: string;
    msisdn: string;
    website?: string;
    facebook?: string;
    instagram?: string;
  };
}

export interface ISchoolResponseData {
  name: string;
  address: {
    city: string;
    district: string;
    province: string;
    street: string;
  };
  age: {
    from: string;
    to: string;
  };
  tuition: {
    from: number;
    to: number;
  };
  information: {
    introduction?: string;
    infrastructure?: string;
    service?: string;
    curriculum?: string;
    workforce?: string;
    policy?: string;
  };
  contact: {
    email: string;
    msisdn: string;
    facebook?: string;
    instagram?: string;
    website?: string;
    map: string;
  };
  updatedAt: Date;
  createdAt: Date;
}

export interface ISchoolModel extends Model<ISchool> {
  build(attrs: ISchoolAttrs): Promise<ISchool>;
}
