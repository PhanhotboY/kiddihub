import { HydratedDocument, Model, ObjectId } from 'mongoose';
// import { PageTemplate } from '../constants';

interface IRawPageTemplate {
  _id: string;
  ptp_name: string;
  ptp_code: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IPageTemplate = HydratedDocument<IRawPageTemplate>;

export interface IPageTemplateAttrs {
  name: string;
  code: string;
}

export interface IPageTemplateResponseData {
  id: string;
  name: string;
  code: string;
}

export interface IPageTemplateModel extends Model<IPageTemplate> {
  build(attrs: IPageTemplateAttrs): Promise<IPageTemplate>;
}
