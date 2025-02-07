import { Schema, Types, model } from 'mongoose';
import { IPage, IPageModel } from '../interfaces/page.interface';
import { formatAttributeName } from '../utils';
import { PAGE } from '../constants';

const pageSchema = new Schema<IPage, IPageModel>(
  {
    pst_title: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    pst_content: {
      type: String,
      trim: true,
    },
    pst_excerpt: {
      type: String,
      trim: true,
    },
    pst_thumbnail: {
      type: String,
      trim: true,
    },
    pst_slug: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    pst_category: {
      type: Types.ObjectId,
      ref: PAGE.CATEGORY.DOCUMENT_NAME,
      required: true,
    },
    pst_template: {
      type: Types.ObjectId,
      ref: PAGE.TEMPLATE.DOCUMENT_NAME,
      required: true,
    },
    pst_views: {
      type: Number,
      required: true,
      default: 0,
    },
    pst_isPublished: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: PAGE.COLLECTION_NAME,
  }
);

pageSchema.statics.build = (attrs: IPage) => {
  return PageModel.create(formatAttributeName(attrs, PAGE.PREFIX));
};

export const PageModel = model<IPage, IPageModel>(
  PAGE.DOCUMENT_NAME,
  pageSchema
);
