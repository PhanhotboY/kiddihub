import { HydratedDocument, Model, ObjectId } from 'mongoose';

export interface IRawCategory {
  id: string;
  cat_name: string;
  cat_page: ObjectId;
  cat_parent: ObjectId;
  cat_order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategoryAttrs {
  name: string;
  page: string;
  parent: string;
  order: number;
}

export type ICategory = HydratedDocument<IRawCategory>;

export interface ICategoryModel extends Model<ICategory> {
  build(attrs: ICategoryAttrs): Promise<ICategory>;
}
