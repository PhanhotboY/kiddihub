import { Schema, Types, model } from 'mongoose';
import { ICategory, ICategoryModel } from '../interfaces/category.interface';
import { formatAttributeName } from '../utils';
import { CATEGORY, PAGE } from '../constants';

const categorySchema = new Schema<ICategory, ICategoryModel>(
  {
    cat_name: { type: String, required: true },
    cat_page: { type: Types.ObjectId, required: true, ref: PAGE.DOCUMENT_NAME },
    cat_parent: { type: Types.ObjectId, ref: CATEGORY.DOCUMENT_NAME },
    cat_order: { type: Number, default: 1 },
  },
  {
    timestamps: true,
    collection: CATEGORY.COLLECTION_NAME,
  }
);

categorySchema.statics.build = (attrs: ICategory) => {
  return CategoryModel.create(formatAttributeName(attrs, CATEGORY.PREFIX));
};

export const CategoryModel = model<ICategory, ICategoryModel>(
  CATEGORY.DOCUMENT_NAME,
  categorySchema
);
