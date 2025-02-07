import { Schema, Types, model } from 'mongoose';
import { ISchool, ISchoolModel } from '../interfaces/school.interface';
import { SCHOOL } from '../constants';
import { formatAttributeName } from '../utils';

const SchoolSchema = new Schema<ISchool, ISchoolModel>(
  {
    sch_name: { type: String, default: 'Unknown', unique: true },
    sch_slug: { type: String, default: 'unknown', unique: true },
    sch_avatar: { type: String, default: '' },
    sch_model: { type: String, default: SCHOOL.MODEL.MAM_NON },
    sch_type: { type: String, default: SCHOOL.TYPE.TU_THUC },
    sch_program: { type: String, default: SCHOOL.PROGRAM.CBGD },
    sch_address: {
      district: { type: String, default: '' },
      province: { type: String, default: '' },
      street: { type: String, default: '' },
    },
    sch_age: {
      from: { type: String, default: '1y' },
      to: { type: String, default: '1y' },
    },
    sch_tuition: {
      from: { type: Number, default: 0, min: 0 },
      to: { type: Number, default: 0, min: 0 },
    },
    sch_information: {
      introduction: { type: String, default: '' },
      infrastructure: { type: String, default: '' },
      service: { type: String, default: '' },
      curriculum: { type: String, default: '' },
      workforce: { type: String, default: '' },
      policy: { type: String, default: '' },
    },
    sch_contact: {
      email: { type: String, default: '' },
      msisdn: { type: String, default: '' },
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
      website: { type: String, default: '' },
      map: { type: String, default: '' },
    },
  },
  {
    timestamps: true,
    collection: SCHOOL.COLLECTION_NAME,
  }
);

SchoolSchema.statics.build = (attrs: ISchool) => {
  return SchoolModel.create(formatAttributeName(attrs, SCHOOL.PREFIX));
};

SchoolSchema.index({ sch_name: 'text' });

export const SchoolModel = model<ISchool, ISchoolModel>(
  SCHOOL.DOCUMENT_NAME,
  SchoolSchema
);
