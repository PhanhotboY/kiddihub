import { HydratedDocument, Model } from 'mongoose';
import { SCHOOL } from '../constants/school.constant';
// import { School } from '../constants';

interface IRawSchool {
  _id: string;
  sch_name: string;
  sch_address: {
    province: string;
    district: string;
    ward: string;
    street: string;
  };
  sch_acceptedAge: {
    from: number;
    to: number;
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
  address: {
    city: string;
    district: string;
    province: string;
    street: string;
  };
  acceptedAge: {
    from: number;
    to: number;
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
  acceptedAge: {
    from: number;
    to: number;
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
