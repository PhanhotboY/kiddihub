import { Schema, Types, model } from 'mongoose';
import { ISchool, ISchoolModel } from '../interfaces/school.interface';
import { SCHOOL } from '../constants';
import { formatAttributeName } from '../utils';

const SchoolSchema = new Schema<ISchool, ISchoolModel>(
  {
    sch_name: { type: String, required: true, unique: true },
    sch_address: {
      city: { type: String, required: true },
      district: { type: String, required: true },
      province: { type: String, required: true },
      street: { type: String, required: true },
    },
    sch_acceptedAge: {
      from: { type: Number, required: true, min: 0 },
      to: { type: Number, required: true, min: 0 },
    },
    sch_tuition: {
      from: { type: Number, required: true, min: 0 },
      to: { type: Number, required: true, min: 0 },
    },
    sch_information: {
      introduction: { type: String },
      infrastructure: { type: String },
      service: { type: String },
      curriculum: { type: String },
      workforce: { type: String },
      policy: { type: String },
    },
    sch_contact: {
      email: { type: String, required: true },
      msisdn: { type: String, required: true },
      facebook: { type: String },
      instagram: { type: String },
      website: { type: String },
      map: { type: String, required: true },
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
