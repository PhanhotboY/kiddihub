import { Schema, Types, model } from 'mongoose';
import { IBranch, IBranchModel } from '../interfaces/branch.interface';
import { formatAttributeName } from '../utils';
import { BRANCH } from '../constants';

const branchSchema = new Schema<IBranch, IBranchModel>(
  {
    bra_email: { type: String, required: true },
    bra_msisdn: { type: String, required: true },
    bra_address: {
      province: { type: String, required: true },
      district: { type: String, required: true },
      street: { type: String, required: true },
    },
    bra_map: { type: String, required: true },
    bra_isMain: { type: Boolean, required: true },
  },
  {
    timestamps: true,
    collection: BRANCH.COLLECTION_NAME,
  }
);

branchSchema.statics.build = (attrs: IBranch) => {
  return BranchModel.create(formatAttributeName(attrs, BRANCH.PREFIX));
};

export const BranchModel = model<IBranch, IBranchModel>(
  BRANCH.DOCUMENT_NAME,
  branchSchema
);
