import { HydratedDocument, Model, ObjectId } from 'mongoose';
// import { Page } from '../constants';

interface IRawPage {
  _id: string;
  pst_title: string;
  pst_content: string;
  pst_thumbnail: string;
  pst_slug: string;
  pst_views: number;
  pst_excerpt: string;
  pst_category: ObjectId;
  pst_template: ObjectId;
  pst_isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type IPage = HydratedDocument<IRawPage>;

export interface IPageAttrs {
  title: string;
  content: string;
  thumbnail: string;
  slug: string;
  excerpt: string;
  category: string;
  template: string;
  isPublished?: boolean;
  views?: number;
}

export interface IPageResponseData {
  id: string;
  category: string;
  template: string;
  title: string;
  content: string;
  excerpt: string;
  thumbnail: string;
  slug: string;
  views: number;
  isPublished: boolean;
}

export interface IPageModel extends Model<IPage> {
  build(attrs: IPageAttrs): Promise<IPage>;
}
