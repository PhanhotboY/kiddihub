import { HydratedDocument, Model } from 'mongoose';

export interface IRawApp {
  app_meta: {
    title: string;
    description: string;
    keywords: string;
  };
  app_logo: string;
  app_contact: {
    email: string;
    phone: string;
    address: string;
  };
  app_social: {
    facebook: string;
    instagram: string;
  };
  app_google: {
    analytics: string;
    reCaptcha: string;
  };
  app_taxCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IApp = HydratedDocument<IRawApp>;

export interface IAppAttrs {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  logo: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  social: {
    facebook: string;
    instagram: string;
  };
  google: {
    analytics: string;
    reCaptcha: string;
  };
  taxCode: string;
}

export interface IAppModel extends Model<IApp> {
  build(attrs: IAppAttrs): Promise<IApp>;
}
