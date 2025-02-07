import { Schema, Types, model } from 'mongoose';
import {
  IPageCategory,
  IPageCategoryModel,
} from '../interfaces/pageCategory.interface';
import { formatAttributeName } from '../utils';
import { PAGE } from '../constants';

const pageCategorySchema = new Schema<IPageCategory, IPageCategoryModel>(
  {
    pct_name: { type: String, required: true, unique: true },
    pct_slug: { type: String, required: true, unique: true },
    pct_parent: { type: Types.ObjectId, ref: PAGE.CATEGORY.DOCUMENT_NAME },
  },
  {
    timestamps: true,
    collection: PAGE.CATEGORY.COLLECTION_NAME,
  }
);

pageCategorySchema.statics.build = (attrs: IPageCategory) => {
  return PageCategoryModel.create(
    formatAttributeName(attrs, PAGE.CATEGORY.PREFIX)
  );
};

export const PageCategoryModel = model<IPageCategory, IPageCategoryModel>(
  PAGE.CATEGORY.DOCUMENT_NAME,
  pageCategorySchema
);
