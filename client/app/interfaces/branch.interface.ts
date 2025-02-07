export interface IBranch {
  id: string;
  bra_address: {
    province: string;
    district: string;
    street: string;
  };
  bra_email: string;
  bra_map: string;
  bra_msisdn: string;
  bra_isMain: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBranchDetail extends IBranch {}
