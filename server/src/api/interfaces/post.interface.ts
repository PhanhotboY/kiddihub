import { HydratedDocument, Model, ObjectId } from 'mongoose';
// import { Post } from '../constants';

interface IRawPost {
  _id: string;
  pst_title: string;
  pst_content: string;
  pst_thumbnail: string;
  pst_slug: string;
  pst_tags: string[];
  pst_views: number;
  pst_excerpt: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IPost = HydratedDocument<IRawPost>;

export interface IPostAttrs {
  title: string;
  content: string;
  thumbnail: string;
  slug: string;
  tags: string[];
  excerpt: string;
  views?: number;
}

export interface IPostResponseData {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  thumbnail: string;
  slug: string;
  tags: string[];
  views: number;
}

export interface IPostModel extends Model<IPost> {
  build(attrs: IPostAttrs): Promise<IPost>;
}
