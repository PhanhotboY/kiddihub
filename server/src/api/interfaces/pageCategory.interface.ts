import { HydratedDocument, Model, ObjectId } from 'mongoose';
// import { PageCategory } from '../constants';

interface IRawPageCategory {
  id: string;
  pct_name: string;
  pct_slug: string;
  pct_parent: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type IPageCategory = HydratedDocument<IRawPageCategory>;

export interface IPageCategoryAttrs {
  name: string;
  slug: string;
  parent: ObjectId;
}

export interface IPageCategoryResponseData {
  id: string;
  name: string;
  slug: string;
  parent: string;
}

export interface IPageCategoryModel extends Model<IPageCategory> {
  build(attrs: IPageCategoryAttrs): Promise<IPageCategory>;
}
