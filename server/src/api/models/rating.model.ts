import { Schema, Types, model } from 'mongoose';
import { IRating, IRatingModel } from '../interfaces/rating.interface';
import { SCHOOL } from '../constants';
import { formatAttributeName } from '../utils';

const SchoolSchema = new Schema<IRating, IRatingModel>(
  {
    rat_schoolId: { type: String, required: true, unique: true },
    rat_userId: {},
  },
  {
    timestamps: true,
    collection: SCHOOL.COLLECTION_NAME,
  }
);

SchoolSchema.statics.build = (attrs: IRating) => {
  return SchoolModel.create(formatAttributeName(attrs, SCHOOL.PREFIX));
};

SchoolSchema.index({ sch_name: 'text' });

export const SchoolModel = model<IRating, IRatingModel>(
  SCHOOL.DOCUMENT_NAME,
  SchoolSchema
);
