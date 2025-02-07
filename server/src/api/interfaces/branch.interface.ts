import { HydratedDocument, Model } from 'mongoose';

export interface IRawBranch {
  bra_email: string;
  bra_msisdn: string;
  bra_address: {
    province: string;
    district: string;
    street: string;
  };
  bra_map: string;
  bra_isMain: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type IBranch = HydratedDocument<IRawBranch>;

export interface IBranchAttrs {
  email: string;
  msisdn: string;
  address: {
    province: string;
    district: string;
    street: string;
  };
  map: string;
  isMain: boolean;
}

export interface IBranchModel extends Model<IBranch> {
  build(attrs: IBranchAttrs): Promise<IBranch>;
}
