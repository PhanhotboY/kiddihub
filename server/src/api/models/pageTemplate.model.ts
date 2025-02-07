import { Schema, Types, model } from 'mongoose';
import {
  IPageTemplate,
  IPageTemplateModel,
} from '../interfaces/pageTemplate.interface';
import { formatAttributeName } from '../utils';
import { PAGE } from '../constants';

const pageTemplateSchema = new Schema<IPageTemplate, IPageTemplateModel>(
  {
    ptp_name: { type: String, required: true, unique: true },
    ptp_code: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
    collection: PAGE.TEMPLATE.COLLECTION_NAME,
  }
);

pageTemplateSchema.statics.build = (attrs: IPageTemplate) => {
  return PageTemplateModel.create(
    formatAttributeName(attrs, PAGE.TEMPLATE.PREFIX)
  );
};

export const PageTemplateModel = model<IPageTemplate, IPageTemplateModel>(
  PAGE.TEMPLATE.DOCUMENT_NAME,
  pageTemplateSchema
);
