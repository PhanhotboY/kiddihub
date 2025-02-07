import { Schema, Types, model } from 'mongoose';
import { IApp, IAppModel } from '../interfaces/app.interface';
import { formatAttributeName } from '../utils';
import { APP } from '../constants';

const appSchema = new Schema<IApp, IAppModel>(
  {
    app_title: { type: String, required: true },
    app_description: { type: String, required: true },
    app_logo: { type: String, required: true },
    app_favicon: { type: String, required: true },
    app_social: {
      facebook: { type: String },
      youtube: { type: String },
      tiktok: { type: String },
      zalo: { type: String },
    },
    app_taxCode: { type: String, required: true },
    app_headScripts: { type: String },
    app_bodyScripts: { type: String },
  },
  {
    timestamps: true,
    collection: APP.COLLECTION_NAME,
  }
);

appSchema.statics.build = (attrs: IApp) => {
  return AppModel.create(formatAttributeName(attrs, APP.PREFIX));
};

export const AppModel = model<IApp, IAppModel>(APP.DOCUMENT_NAME, appSchema);
