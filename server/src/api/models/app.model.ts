import { Schema, Types, model } from 'mongoose';
import { IApp, IAppModel } from '../interfaces/app.interface';
import { formatAttributeName } from '../utils';
import { APP } from '../constants';

const appSchema = new Schema<IApp, IAppModel>(
  {
    app_meta: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      keywords: { type: String, required: true },
    },
    app_logo: { type: String, required: true },
    app_contact: {
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    app_social: {
      facebook: { type: String, required: true },
      instagram: { type: String, required: true },
    },
    app_google: {
      analytics: { type: String, required: true },
      reCaptcha: { type: String, required: true },
    },
    app_taxCode: { type: String, required: true },
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
