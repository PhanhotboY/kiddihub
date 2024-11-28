import { HydratedDocument, Model, Types } from 'mongoose';
import { TEMPLATE } from '../constants';

export interface IRawTemplate {
  tem_name: string;
  tem_html: string;
  tem_status: Values<typeof TEMPLATE.STATUS>;
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITemplate extends HydratedDocument<IRawTemplate> {}

export interface ITemplateAttrs {
  name: string;
  html: string;
  status: IRawTemplate['tem_status'];
}

export interface ITemplateModel extends Model<ITemplate> {
  build(attrs: ITemplateAttrs): Promise<ITemplate>;
}

export interface ITemplateResponseData {
  id: string;
  name: string;
  html: string;
  status: IRawTemplate['tem_status'];
  createdAt: Date;
  updatedAt: Date;
}
