export interface IAppSettings {
  app_meta: {
    title: string;
    description: string;
    keywords: string;
  };
  app_logo?: string;
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
}

export interface IAppSettingsAttrs {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  logo?: string;
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
