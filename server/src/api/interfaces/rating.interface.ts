import { HydratedDocument, Model } from 'mongoose';

export interface IRawRating {
  rat_schoolId: string;
  rat_userId: string;
  rat_rating: string;
  rat_comment: string;
}

export interface IRating extends HydratedDocument<IRawRating> {}

export interface IRatingAttrs {
  schoolId: IRawRating['rat_schoolId'];
  userId: IRawRating['rat_userId'];
  rating: IRawRating['rat_rating'];
  comment: IRawRating['rat_comment'];
}

export interface IRatingModel extends Model<IRating> {
  build(attrs: IRatingAttrs): Promise<IRating>;
}
